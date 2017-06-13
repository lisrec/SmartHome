var express = require('express')
var router 	= express.Router()

var db 		= require('../db.js')

router.post('/tokens', function(req, res, next) {
	
	console.log(req.body)

	let result = { success: false, error: false }
		
	db.connection.query("SELECT * FROM access_control")

		.on('result', function (row) {
			if(req.body.pass === row.pass && req.body.login === row.login) {
				let user = {
					id: row.id, 
					login: row.login,
					admin: row.admin
				}

				let token = req.jwt.sign(user, req.secret, {
		        	expiresIn : 60*60*24
		        })

		        result = {
					success: true,
					token: token
		        }
			}
		})

		.on('end', function() {
			res.json( result )
		})

		.on('error', function (err) {
			result = {
				error: true,
				msg: "DB_fail",
				success: false
	        }
	        res.json( result )
		})

})

router.post('/check', function(req, res, next) {
	
	//console.log(req.body)

	var token = req.body.token || req.query.token || req.headers['x-access-token']
	if (token) {
		req.jwt.verify(token, req.secret, function(err, decoded) {      
			if (err) {
				return res.json({ success: false })    
			} else {

				db.connection.query("SELECT 1 FROM access_control")
					.on('result', function (row) {})
					.on('end', function() {
						return res.json({ success: true }) 
					})
					.on('error', function (err) {
						return res.json({ success: false }) 
					})
			}
		})
	} else {
		return res.json({ 
			success: false
		})
	}

})

module.exports = router