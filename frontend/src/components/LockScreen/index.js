import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import LockScreenStyle from './style.scss'

class LockScreen extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {

		return (
				<h1>LOCK SCREEN</h1>
			)

	}
}

export default LockScreen