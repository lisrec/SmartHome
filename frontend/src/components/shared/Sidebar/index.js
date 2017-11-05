import React from 'react'
import ReactDom from 'react-dom'

import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer';

const styles = theme => ({
	root: {
		position: 'relative',
    	height: '100%',
    	width: drawerWidth,
	}
})


export class Sidebar extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Drawer anchor="left" type="persistent" open="true" classes={{paper: styles.root}}>
				<span>Test</span>
			</Drawer>
		)
	}
}
	