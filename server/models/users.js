module.exports = (sequelize, Sequelize) => {

	const User = sequelize.define('user', {
		login: {
			type: Sequelize.STRING
		},
		pass: {
			type: Sequelize.STRING
		}
	}, {
		timestamps: false
	})

  return User
}