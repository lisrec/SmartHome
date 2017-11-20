import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

import MainStyle from './style.scss'
import consts from '../../utils/constants'
import { GuardRoute } from '../shared/GuardRoute'
import { checkToken } from '../../services/ApiService'
import { NavigationTop } from '../shared/NavigationTop'
import { Sidebar } from '../shared/Sidebar'
import { InfoScreen } from '../InfoScreen'
import RoomsGrid from '../RoomsGrid'
import { Room } from '../Room'
import { Devices } from '../Devices'

class Main extends React.Component {

	render() {

		return (this.props.appState === consts.STATE_ACTIVE) ? (
				<div>
					<NavigationTop user={this.props.user} />
					<div className="container mainContainer">
						<Route path="/rooms" render={ (props) => <RoomsGrid {...props} rooms={this.props.rooms} roomCallbacks={this.props.roomCallbacks}/> } />
						<Route path="/devices" component={Devices} />
						<Route path="/room/:id"  render={ (props) => <Room {...props} rooms={this.props.rooms} roomCallbacks={this.props.roomCallbacks}/> } />
						<Route exact path="/" component={RoomsGrid} />
					</div>
				</div>
			) : <InfoScreen />
	}
}

Main.propTypes = {
	appState: PropTypes.string.isRequired,
	user: PropTypes.object,
	rooms: PropTypes.array,
	devices: PropTypes.array,
	roomCallbacks: PropTypes.object,
	deviceCallbacks: PropTypes.object
}

export default Main