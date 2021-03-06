import React from 'react'
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import { MUSIC_LIST } from './config/musiclist'
import { Router, IndexRoute, Link, Route, hashHistory } from 'react-router'
import Pubsub from 'pubsub-js'

let App = React.createClass({
	getInitialState() {
		return {
			musicList: MUSIC_LIST,
			currentMusitItem: MUSIC_LIST[0]
		}
	},
	playMusic(musicItem) {
		$("#player").jPlayer("setMedia", {
			mp3: musicItem.file
		}).jPlayer('play');

		this.setState({
			currentMusitItem: musicItem
		})
	},
	playNext(type = 'next') {
		let index = this.findMusicIndex(this.state.currentMusitItem);
		let newIndex = null;
		let musicListLength = this.state.musicList.length;
		if (type === 'next') {
			newIndex = (index + 1) % musicListLength;
		}else{
			newIndex = (index - 1 + musicListLength) % musicListLength;
		}

		let musicItem = this.state.musicList[newIndex];
		this.setState({
			currentMusitItem: musicItem
		})
		this.playMusic(musicItem);
	},
	findMusicIndex(musicItem) {
		return this.state.musicList.indexOf(musicItem);
	},
	componentDidMount() {
		$("#player").jPlayer({
			supplied: 'mp3',
			wmode: 'window'
		});
		this.playMusic(this.state.currentMusitItem);
		$("#player").bind($.jPlayer.event.ended, (e) => {
			this.playNext();
		})

		Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
			this.setState({
				musicList: this.state.musicList.filter( item => {
					return item !== musicItem;
				})
			})
		});
		Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
			this.playMusic(musicItem);
		});
		Pubsub.subscribe('PLAY_PREV', () => {
			this.playNext('prev');
		});
		Pubsub.subscribe('PLAY_NEXT', () => {
			this.playNext();
		});

	},
	componentWillUnMount() {
		Pubsub.unsubscribe('PLAY_MUSIC');
		Pubsub.unsubscribe('DELETE_MUSIC');
		$("#player").unbind($.jPlayer.event.ended);
		Pubsub.subscribe('PLAY_PREV');
		Pubsub.subscribe('PLAY_NEXT');
	},
	render() {
		return (
			<div>
				<Header />
				{ React.cloneElement(this.props.children,this.state) }
			</div>
		)
	}
})
let Root = React.createClass({
	render() {
		return(
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Player}/>
					<Route path="list" component={MusicList}/>
				</Route>
			</Router>
		)
	}
})

export default Root;



