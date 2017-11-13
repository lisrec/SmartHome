import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { GuardRoute } from '../shared/GuardRoute'
import { TokensApi } from '../../services/tokens'

import MainStyle from './style.scss'

import { NavigationTop } from '../shared/NavigationTop'
import { Sidebar } from '../shared/Sidebar'
import { UserLogin } from '../User/Login'
import { InfoScreen } from '../InfoScreen'
import { RoomsGrid } from '../RoomsGrid'
import { Room } from '../Room'
import { Devices } from '../Devices'

export class MainComponent extends React.Component {

	constructor(props) {
		super(props)
		this.logOut = this.logOut.bind(this)
		this.logIn = this.logIn.bind(this)
		this.resetInactiveTimer = this.resetInactiveTimer.bind(this)

		//Inactive config
		this.timeToInactive = 1000 * 60 
		this.inActiveTimer = null

		this.TokensApi = new TokensApi()

		//Load session/token user
		this.state = {
			redirectAfterLogIn: false,
			informationScreen: false,
			homeLocked: false,
			loggedIn: false,
			user: {}
		}
	}

	resetInactiveTimer() {
		window.clearTimeout(this.inActiveTimer)
		this.inActiveTimer = window.setTimeout(this.setState.bind(this, {informationScreen: true}), this.timeToInactive)
		
		if (this.state.informationScreen)
			this.setState({informationScreen: false})
	}

	_handleActivity = event => this.resetInactiveTimer()

    componentDidMount() {
        window.document.addEventListener('mousemove', this._handleActivity)
        window.document.addEventListener('mousedown', this._handleActivity)
        window.document.addEventListener('keypress', this._handleActivity)
        window.document.addEventListener('DOMMouseScroll', this._handleActivity)
        window.document.addEventListener('mousewheel', this._handleActivity)
        window.document.addEventListener('touchmove', this._handleActivity)
        window.document.addEventListener('MSPointerMove', this._handleActivity)
        this.resetInactiveTimer()
    }

    componentWillUnmount() {
        window.document.removeEventListener('mousemove', this._handleActivity)
        window.document.removeEventListener('mousedown', this._handleActivity)
        window.document.removeEventListener('keypress', this._handleActivity)
        window.document.removeEventListener('DOMMouseScroll', this._handleActivity)
        window.document.removeEventListener('mousewheel', this._handleActivity)
        window.document.removeEventListener('touchmove', this._handleActivity)
        window.document.removeEventListener('MSPointerMove', this._handleActivity)
    }

	componentWillUpdate(nextProps, nextState) {
		if (this.TokensApi.isAuthenticated()) {
			const usr = this.TokensApi.getUser()
			this.setState({loggedIn: true, user: usr})
		}
	}

	logOut = () => {
		//Send logout service ?
		this.setState({loggedIn: false, user: {}})
	}

	logIn = (user) => {
		if (user) {
			this.setState({loggedIn: true, user: user})
		}
	}

	render() {

		return (this.state.homeLocked) ? ( //Showing unlock screen (Home alarm is enabled)

			<span> [Komponent do odbezpieczenia domu] </span>

		) : (this.state.informationScreen) ? ( //Showing Information screen

			<InfoScreen />

		) : ( //Showing application (User is logged In)

			<Router>
				<div>
					<NavigationTop loggedIn={this.state.loggedIn} user={this.state.user} logOutAction={this.logOut}/>
					<div className="container mainContainer">
						<GuardRoute path="/" component={RoomsGrid} />
						<GuardRoute path="/rooms" component={RoomsGrid} />
						<GuardRoute path="/devices" component={Devices} />
						<GuardRoute path="/room/:id" component={Room} />
					</div>
					<Route path="/login" component={UserLogin} />
				</div>
			</Router>

		)
	}
}