import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import { PageHeader } from 'react-bootstrap'

class Devices extends React.Component {

	render() {

		return (
				<div>
					<PageHeader>Urządzenia <small>zarządzanie urządzeniami</small></PageHeader>
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