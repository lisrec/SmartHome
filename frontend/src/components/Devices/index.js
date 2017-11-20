import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import { PageHeader } from 'react-bootstrap'
import _ from 'lodash'

class SingleDevice extends React.Component {

	render() {

		let device = this.props.device

		return (device) ? (
			<div>
				{device.name}
			</div>
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