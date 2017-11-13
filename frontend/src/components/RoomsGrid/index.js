import React from 'react'
import ReactDom from 'react-dom'
import RoomsStyle from './style.scss'
import { Link } from 'react-router-dom'
import { PageHeader, Panel, Image, Grid, Row, Col } from 'react-bootstrap'
import _ from 'lodash'

import { roomsFakeData } from '../../assets/fakeData/data'

export class RoomsGrid extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	renderRoomPanel(roomObj) {
		return (
				<Col key={roomObj.id} xs={12} sm={6} md={4} lg={4}>
					<Panel>
						<Link to={"/room/" + roomObj.id} >
							<div className="crop-img">
								<Image src={roomObj.img} />
								<div className="title">
									{roomObj.name}
								</div>
							</div>
						</Link>

						<div className="body">
							<p>
								Jakieś info z dupy.
							</p>
						</div>
					</Panel>
				</Col>
			)
	}

	renderGridRooms(roomsArray) {
		return _.map(roomsArray, (room) => {
			return this.renderRoomPanel(room)
		})
	}

	render() {

		return (
				<div>
					<PageHeader>Pokoje <small>zarządzanie pomieszczeniami
					</small></PageHeader>
					
					<Grid>
						<Row>
							{this.renderGridRooms(roomsFakeData)}
						</Row>
					</Grid>
				</div>
			)

	}
}