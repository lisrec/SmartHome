import React from 'react'
import ReactDom from 'react-dom'
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

	toggle = () => {
		this.setState({expanded: !this.state.expanded})
	}

	close = () => {
		if (this.state.expanded)
			this.setState({expanded: false})
	}

	render() {
		return (
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
						<NavItem eventKey={1} componentClass={Link} href="/test" to="/test" onClick={this.close} active={location.pathname === '/test'}>
							<Icon name="camera"/> Komponent1
						</NavItem>
						<NavItem eventKey={2} componentClass={Link} href="/test2" to="/test2" onClick={this.close} active={location.pathname === '/test2'}>
							Komponent2
						</NavItem>
						
						<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
							<MenuItem eventKey={3.1}>Action</MenuItem>
							<MenuItem eventKey={3.2}>Another action</MenuItem>
							<MenuItem eventKey={3.3}>Something else here</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={3.4}>Separated link</MenuItem>
						</NavDropdown>

					</Nav>
				</Navbar.Collapse>

			</Navbar>
		)
	}
}