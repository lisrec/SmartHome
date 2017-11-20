import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import update from 'react-addons-update'
import LockScreenStyle from './style.scss'

class KeyboardButton extends React.Component {

	render() {
		const { buttonValue } = {...this.props}

		return (
			<button 
				className="keyboard__button"
				onClick={this.props.clickHandler.bind(null, buttonValue)} >
				{buttonValue}
			</button>
		)
	}
}

KeyboardButton.propTypes = {
	buttonValue: PropTypes.string.isRequired,
	clickHandler: PropTypes.func.isRequired
}

class LockScreen extends React.Component {

	constructor(props) {
		super(props)

		this.handleButtonPin = this.handleButtonPin.bind(this)
		this.handleShowPin = this.handleShowPin.bind(this)

		this.state = {
			pinCode: "",
			showingKeys: false
		}
	}

	handleButtonPin(val) {
		let nextPinCode = this.state.pinCode + val
		this.setState({pinCode: nextPinCode})
	}

	handleShowPin(show) {
		let nextState = (show) ? true : false
		this.setState({showingKeys: nextState})
	}

	render() {

		let showingContent = (this.state.showingKeys) ? (
				<div>
					<input 
						type="password" 
						className="pinHolder" 
						value={this.state.pinCode} />
						
					<br />
					<div className="keyboard">
						<KeyboardButton buttonValue="1" clickHandler={this.handleButtonPin} />
						<KeyboardButton buttonValue="2" clickHandler={this.handleButtonPin} />
						<KeyboardButton buttonValue="3" clickHandler={this.handleButtonPin} />
						<br />
						<KeyboardButton buttonValue="4" clickHandler={this.handleButtonPin} />
						<KeyboardButton buttonValue="5" clickHandler={this.handleButtonPin} />
						<KeyboardButton buttonValue="6" clickHandler={this.handleButtonPin} />
						<br />
						<KeyboardButton buttonValue="7" clickHandler={this.handleButtonPin} />
						<KeyboardButton buttonValue="8" clickHandler={this.handleButtonPin} />
						<KeyboardButton buttonValue="9" clickHandler={this.handleButtonPin} />
						<br />
						<KeyboardButton buttonValue="0" clickHandler={this.handleButtonPin} />
					</div>
				</div>
			) : (
				<h1 onClick={this.handleShowPin.bind(null, true)}>
					<i className="fa fa-4x fa-lock" aria-hidden="true"></i>
				</h1>
			)

		return (
				<div className="lockScreen__wrapper">
					{showingContent}
				</div>
			)

	}
}

export default LockScreen