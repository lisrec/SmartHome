const express = require('express')
const router 	= express.Router()
const jwt		= require('jsonwebtoken')

const secret 	= require('./../config').secret
const group_names = ['root','admin','security','renter','observer']
/*===========================
=            GETs           =
===========================*/

router.get('/checkToken', (req, res, next) => {
	let token =  req.headers['x-access-token']
	if (token){
		jwt.verify(token, secret, (err, decoded) => {
			if (err){
				res.status(401).end()
			} else {
				res.status(200).json(decoded).end()
			}
		})
	} else {
		res.status(401).end()
	}
})

/*=============================
=            POSTs            =
=============================*/

router.post('/', (req, res, next) => {
	let login = req.body.login
	let pass = req.body.pass
	const signUser = {
		login:'admin',
		pass:'admin'
	}
	if (login == signUser.login && pass == signUser.pass) {
		let token = jwt.sign(signUser, secret, {
			expiresIn : ExpirationTime[user.user_type]
		});
		res.status(201).json({
			token: token,
			signUser: signUser
		})
	} else {
		res.status(401).end()
	}

	
})


/*============================
=            PUTs            =
============================*/



module.exports = router



