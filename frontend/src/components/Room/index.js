import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { roomsFakeData } from '../../assets/fakeData/data'


export class Room extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	renderRoom(id) {

	}

	render() {
		return (
				<span> {roomsFakeData[this.props.match.params.id].name} </span>
			)
	}

}
