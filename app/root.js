import React from 'react'
import Header from './components/header'
import Player from './page/player'
import { MUSIC_LIST } from './config/musiclist'

let Root = React.createClass({
	getInitialState() {
		return {
			currentMusitItem: MUSIC_LIST[0]
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
				<Player currentMusitItem={this.state.currentMusitItem}/>
			</div>
		)
	}
})

export default Root;



