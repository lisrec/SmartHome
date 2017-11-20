import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { GuardRoute } from '../shared/GuardRoute'

import Main from '../Main'
import consts from '../../utils/constants'

import { 
	addEventUserActive, 
	delEventUserActive } from '../../utils/utils'

import { 
	checkToken, 
	getRooms } from '../../services/ApiService'


class MainContainer extends React.Component {

	constructor(props) {
		super(props)

		this.resetInactiveTimer = this.resetInactiveTimer.bind(this)
		this.timeToInactive = 1000 * 5
		this.inActiveTimer = null

		this.state = {
			user: {},
			rooms: [],
			devices: [],
			appState: consts.STATE_ACTIVE
		}
	}

	_handleActivity = (event) => {
		this.resetInactiveTimer()
	}

	componentDidMount() {
		checkToken()
			.then(usr => { this.setState({user: usr}) })
			.catch(e => { this.props.history.push('/login', null) })

		getRooms()
			.then(rooms => { this.setState({rooms: rooms}) })
			.catch(e => console.log(e))

		addEventUserActive(this._handleActivity)
		this.resetInactiveTimer()
	}

	componentWillUnmount() {
		delEventUserActive(this._handleActivity)
	}

	resetInactiveTimer() {
		window.clearTimeout(this.inActiveTimer)
		this.inActiveTimer = window.setTimeout(this.setState.bind(this, {appState: consts.STATE_INACTIVE}), this.timeToInactive)
		if (this.state.appState === consts.STATE_INACTIVE)
			this.setState({appState: consts.STATE_ACTIVE})
	}

	render() {
		return (
			<Main appState={this.state.appState}
				user={this.state.user}
				rooms={this.state.rooms}
				devices={this.state.devices}
				roomCallbacks={{}}
				deviceCallbacks={{}} />
		)
	}
}

export default MainContainer