import React from 'react'
import ReactDom from 'react-dom'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { NavigationTop } from '../shared/NavigationTop'
import { Sidebar } from '../shared/Sidebar'

const styles = theme => ({
	root: {
		width: '100%'
	}
})

export class MainComponent extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<NavigationTop />
					<Route path="/test" component={Sidebar}/>
				</div>
			</Router>
		)
	}
}