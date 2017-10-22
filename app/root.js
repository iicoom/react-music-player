import React from 'react'
import Header from './components/header'
import Progress from './components/progress'

let Root = React.createClass({
	getInitialState() {
		return {
			progress: '-'
		}
	},
	componentDidMount() {
		$("#player").jPlayer({
			ready: function () {
				$(this).jPlayer("setMedia", {
					mp3: "http://oj4t8z2d5.bkt.clouddn.com/%E6%88%90%E9%83%BD.mp3"
				}).jPlayer('play');
			},
			supplied: "mp3",
			wmode: "window",
			useStateClassSkin: true
		});
		$('#player').bind($.jPlayer.event.timeupdate, (e) => {
			this.setState({
				progress: e.jPlayer.status.currentPercentAbsolute
			})
		})
	},
	componentWillUnMount() {
		$('#jPlayer').unbind($.jPlayer.event.timeupdate);
	},

	render() {
		return (
			<div>
				<Header />
				<Progress progress={this.state.progress}/>
			</div>
		)
	}
})

export default Root;



