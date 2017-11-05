import React from 'react'
import { Component } from 'react'
import ReactDom from 'react-dom'

import { withStyles } from 'material-ui/styles'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'

const styles = theme => ({
	root: {
		marginTop: theme.spacing.unit * 3,
		width: '100%',
	},
	
	flex: {
		flex: 1,
	},

	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},

	loginButton: {
		position: relative,
		right: 10,
	},
})

export class NavigationTop extends React.Component {
	render() {
		return (
			<div className={styles.root}>
				<AppBar position="fixed">
					<Toolbar>
						<IconButton className={styles.menuButton} color="contrast" aria-label="Menu">
							<MenuIcon />
						</IconButton>
						<Typography type="title" color="inherit" className={styles.flex}>
							Title
						</Typography>
						<Button color="contrast" className={styles.loginButton}>Login</Button>
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}