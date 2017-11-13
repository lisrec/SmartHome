import React from 'react'
import ReactDom from 'react-dom'
import { Route, Redirect } from 'react-router-dom'
import { TokensApi } from '../../../services/tokens'

export const GuardRoute = ({ component: Component, ...rest }) => {
	let tokensApi = new TokensApi()

	return (
		<Route {...rest} render={props => (
			tokensApi.isAuthenticated() ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: '/login' }} />
			)
		)}/>
	)
}