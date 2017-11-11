import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { NavigationTop } from '../shared/NavigationTop'
import { Sidebar } from '../shared/Sidebar'

const styles = theme => ({
	root: {
		width: '100%'
	}
})

export class MainComponent extends React.Component {

	constructor(props) {
		super(props)
		this.logOut = this.logOut.bind(this)

		//Load session/token user
		this.state = {
			loggedIn: true,
			user: {
				login: "Admin"
			}
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextState.loggedIn == false)
			console.log("Armagedon kurwa: :D")
	}

	logOut = () => {
		//Send logout service ?
		this.setState({loggedIn: false, user: {}})
	}

	render() {
		return (this.state.loggedIn) ? (
			<Router>
				<div>
					<NavigationTop loggedIn={this.state.loggedIn} user={this.state.user} logOutAction={this.logOut}/>
					<Route path="/test" component={Sidebar}/>
				</div>
			</Router>
		) : (
			<span>LOGUJ SIE KURWA ! </span>
		)
	}
}