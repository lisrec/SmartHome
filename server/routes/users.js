const express = require('express')
const router 	= express.Router()

const sequ = require('../libs/sequelizeDB.js')
const Users = require('../models/users.js')(sequ.sequelize ,sequ.Sequelize)

/*===========================
=            GETs           =
===========================*/

router.get('/', (req, res, next) => {
	Users.findAll().then(users => {
		res.status(200).json(users)
	})
})

 /*=============================
 =            POSTs            =
 =============================*/

router.post('/', (req, res, next) => {
	
})

 /*============================
 =            PUTs            =
 ============================*/



module.exports = router



