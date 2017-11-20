import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

import { BrowserRouter as Router, 
	Route, 
	Link, 
	Redirect } from 'react-router-dom'

import consts from '../../utils/constants'
import { checkToken } from '../../services/ApiService'

import MainStyle from './style.scss'
import Room from '../Room'
import Devices from '../Devices'
import NavigationTop from '../shared/NavigationTop'
import InfoScreen from '../InfoScreen'
import RoomsGrid from '../RoomsGrid'

class Main extends React.Component {

	render() {

		let currentShow = (this.props.appState === consts.STATE_ACTIVE) ? (
				<div key="mainRouter">
					<NavigationTop user={this.props.user} alarmCallbacks={this.props.alarmCallbacks} />
					<div className="container mainContainer">
						<Route path="/rooms" render={ (props) => <RoomsGrid {...props} devices={this.props.devices} rooms={this.props.rooms} roomCallbacks={this.props.roomCallbacks}/> } />
						<Route path="/devices" render={ (props) => <Devices {...props} devices={this.props.devices} deviceCallbacks={this.props.deviceCallbacks} /> } />
						<Route path="/room/:id"  render={ (props) => <Room {...props} devices={this.props.devices} rooms={this.props.rooms} roomCallbacks={this.props.roomCallbacks}/> } />
						<Route exact path="/" render={ (props) => <RoomsGrid {...props} devices={this.props.devices} rooms={this.props.rooms} roomCallbacks={this.props.roomCallbacks}/> } />
					</div>
				</div>
			) : <InfoScreen key="infoScreen" />

		return (
			<div>
				<CSSTransitionGroup
					transitionName="mainTransition"
					transitionAppear={true}
					transitionEnter={true}
					transitionLeave={true}
					transitionAppearTimeout={750}
					transitionEnterTimeout={750}
					transitionLeaveTimeout={200} >

					{currentShow}

				</CSSTransitionGroup>
			</div>
		)
	}
}

Main.propTypes = {
	appState: PropTypes.string.isRequired,
	user: PropTypes.object,
	rooms: PropTypes.array,
	devices: PropTypes.array,
	roomCallbacks: PropTypes.object,
	deviceCallbacks: PropTypes.object,
	alarmCallbacks: PropTypes.object
}

export default Main