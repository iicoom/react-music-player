import React from 'react'
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import { MUSIC_LIST } from './config/musiclist'
import { Router, IndexRoute, Link, Route, hashHistory } from 'react-router'

let App = React.createClass({
	getInitialState() {
		return {
			musicList: MUSIC_LIST,
			currentMusitItem: MUSIC_LIST[1]
		}
	},
	componentDidMount() {
		$("#player").jPlayer({
			ready: function () {
				$(this).jPlayer("setMedia", {
					mp3: "http://oj4t8z2d5.bkt.clouddn.com/%E6%88%91%E8%A6%81%E4%BD%A0.mp3"
				}).jPlayer('play');
			},
			supplied: "mp3",
			wmode: "window",
			useStateClassSkin: true
		});
	},
	componentWillUnMount() {
		
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



