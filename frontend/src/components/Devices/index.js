import React from 'react'
import ReactDom from 'react-dom'
import { PageHeader } from 'react-bootstrap'

export class Devices extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {

		return (
				<div>
					<PageHeader>Urządzenia <small>zarządzanie urządzeniami
					</small></PageHeader>
				</div>
			)

	}
}