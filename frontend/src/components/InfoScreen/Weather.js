import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

import WeatherStyles from './weather.scss'

class Weather extends React.Component {

	render() {

		let forecast = this.props.forecast
		const temp = (val) => (<span> {Number(val).toFixed(0)}&#186;C</span>)

		return (forecast.currently) ? (
				<div className="weather">
					<div className="weather__header">Aktualna pogoda</div>
					<div className="weather__current">
						<div className={"weather__current__image " + forecast.currently.icon}></div>

						<h1 className="weather__current__temp">
							{temp(forecast.currently.temperature)}
						</h1>

						<h2 className="weather__current__summary">
							{forecast.currently.summary}
						</h2>
					</div>

					<div className="weather__next-days">

					</div>
				</div>
			) : null

	}
}

Weather.propTypes = {
	forecast: PropTypes.object
}

export default Weather