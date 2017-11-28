import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Switch from '../shared/Switch'
import { PageHeader,
	Panel,
	Col } from 'react-bootstrap'

class SingleDevice extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			buttonState: true
		}
	}

	render() {

		let device = this.props.device
		const title = <h3> {device.name} </h3>

		return (device) ? (
			<Col xs={6} sm={4} md={3}>
				<Panel header={title}>
					<Switch value={this.state.buttonState} name="test" />
				</Panel>
			</Col>
		) : (null)	
	}
}

SingleDevice.propTypes = {
	device: PropTypes.object
}

class Devices extends React.Component {

	render() {

		let filteredDevices = (this.props.roomId) ? _.filter(this.props.devices, d => d.roomId == this.props.roomId) : this.props.devices
		let devices = _.map(filteredDevices, device => (
				<SingleDevice key={device.id} device={device}/>
			))

		return (
				<div>
					<PageHeader>Urządzenia <small>zarządzanie urządzeniami</small></PageHeader>
					{devices}
				</div>
			)

	}
}

Devices.propTypes = {
	roomId: PropTypes.number,
	devices: PropTypes.array,
	deviceCallbacks: PropTypes.object
}

export default Devices