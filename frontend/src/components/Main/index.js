import React from 'react'
import { Component } from 'react'
import ReactDom from 'react-dom'
import { withStyles } from 'material-ui/styles'

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
			<div className={styles.root}>
				<NavigationTop />
				<Sidebar />
			</div>
		)
	}
}