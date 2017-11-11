import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Icon } from './../Icon'

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

import NavigationStyles from './style.scss';

export class NavigationTop extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			expanded: false
		}
	}

	getNavigationElementUser = () => {
		return (
			<span>
				<Icon name="user" /> {this.props.user.login}
			</span>
			)
	}

	toggle = () => {
		this.setState({expanded: !this.state.expanded})
	}

	close = () => {
		if (this.state.expanded)
			this.setState({expanded: false})
	}

	render() {
		return (this.props.loggedIn) ? (
			<Navbar 
				inverse
				fixedTop
				staticTop
				onToggle={this.toggle}
				expanded={this.state.expanded} >
				
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">SmartHome</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>

				<Navbar.Collapse>
					<Nav>
						<NavItem eventKey={1} componentClass={Link} href="/rooms" to="/rooms" onClick={this.close} active={location.pathname === '/rooms'}>
							<Icon name="home"/> Pomieszczenia
						</NavItem>
						<NavItem eventKey={2} componentClass={Link} href="/devices" to="/devices" onClick={this.close} active={location.pathname === '/devices'}>
							<Icon name="lightbulb-o"/> Urządzenia
						</NavItem>
					</Nav>
					<Nav pullRight>
						<NavDropdown eventKey={3} title={this.getNavigationElementUser()} id="navigation-user-menu">
							<MenuItem eventKey={3.1} componentClass={Link} href="/myAccount" to="/myAccount" onClick={this.close} active={location.pathname === '/myAccount'}>Moje Konto</MenuItem>
							<MenuItem eventKey={3.2} componentClass={Link} href="/settings" to="/settings" onClick={this.close} active={location.pathname === '/settings'}>Ustawienia</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={3.3} componentClass={Link} href="/login" to="/login" onClick={this.close && this.props.logOutAction}>Wyloguj</MenuItem>
						</NavDropdown>
						<NavItem eventKey={4} componentClass={Link} href="/lock" to="/lock" onClick={this.close} active={location.pathname === '/lock'}>
							<Icon name="lock"/> Zablokuj
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		) : <div></div>
	}
}

NavigationTop.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	logOutAction: PropTypes.func.isRequired,
	user: PropTypes.object
}