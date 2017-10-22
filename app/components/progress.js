import React from 'react'
import './header.less'

let Progress = React.createClass({
	render() {
		return (
			<div className="row components-progress">
				{ this.props.progress }s
			</div>
		)
	}
});

export default Progress;