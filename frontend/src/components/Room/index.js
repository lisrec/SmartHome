import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


class Room extends React.Component {

	render() {

		let roomId = this.props.match.params.id
		let room = _.find(this.props.rooms, room => room.id == roomId)

		return (room) ? (
			<div>
				<h1> {room.name} </h1>
				<img src={room.img} />
			</div>
		) : null
	}

}

Room.propTypes = {
	rooms: PropTypes.array
}

export default Room