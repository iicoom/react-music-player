import React from 'react'
import Header from './components/header'
import Progress from './components/progress'

let Root = React.createClass({
	render() {
		return (
			<div>
				<Header />
				<Progress progress="1"/>
			</div>
		)
	}
})

export default Root;



