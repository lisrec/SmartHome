import React from 'react'
import ReactDom from 'react-dom'
import InfoScreenStyle from './style.scss'

export class InfoScreen extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			timeInterval: 1000,
			counter: 0
		}
	}

	componentDidMount() {
		this.refreshData()
	}

	componentWillUnmount() {
		clearInterval(this.refresher)
	}

	refreshData() {
		console.log("Odswizam")
		this.setState({counter: ++this.state.counter})
		this.refresher = setTimeout(this.refreshData.bind(this), this.state.timeInterval)
	}

	render() {

		return (
				<div className="screenInfoContainer">
					<h1> Information screen ({this.state.counter} pobranych danych)</h1>
				</div>
			)

	}
}