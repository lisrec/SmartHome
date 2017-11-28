module.exports = (sequelize, Sequelize) => {

	const Devices = sequelize.define('devices', {
		type: {
			type: Sequelize.STRING,
		},
		input_id: {
			type: Sequelize.INTEGER
		},
		room_id: {
			type: Sequelize.INTEGER
		},
		state: {
			type: Sequelize.JSON
		},
		name: {
			type: Sequelize.STRING(60),
		},
		img: {
			type: Sequelize.STRING(60),
		}
	}, {
		timestamps: false
	})

  return Devices
}