const express 	   = require('express')
const path 		   = require('path')
const bodyParser   = require('body-parser')
const morgan       = require('morgan')
const jwt		   = require('jsonwebtoken')
const _ 		   = require('lodash')

const config = require('./config')
const checkDB 	= require('./libs/updateDB.js')


const tokensRouter = require('./routes/tokens')
const devicesRouter = require('./routes/devices')
//var route = require('./routes/route')

//For testing purpose
let alarmStatus = false

var app = express()

var _port = 3376

app.set('superSecret', config.secret)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(morgan('dev'))

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token")
	if ('OPTIONS' == req.method) {
		res.sendStatus(200)
	} else {
		next()
	}
})


app.use("/api/tokens", tokensRouter)



app.use(function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token']
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' })    
			} else {
				req.decoded = decoded    
				next()
			}
		})
	} else {
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.' 
		})
	}
})

app.use("/api/devices", devicesRouter)


//For testing purpose
app.get("/api/alarm/:state", function(req, res) {
	let state = (req.params.state == "true") ? true : false
	alarmStatus = state
	res.status(200).json({alarmStatus: alarmStatus})
})
app.get("/api/alarm", function(req, res) {
	res.status(200).json({alarmStatus: alarmStatus})
})

app.get('*', function(req, res){
	res.send('server')
})

process.on('SIGINT', () => {
    devicesRouter.deinitArduino((res) => {
    	if(res) {
    		console.log("\nDeinicjalizacja zakończona powodzeniem.\n")
    		process.exit()
    	} else {
    		console.log("\nDeinicjalizacja zakończona błędem.\n")
    		process.exit()
    	}
    })
})

app.listen(_port, function(){
	console.log('Server started on ', _port)
	checkDB.updateDB()
	//devicesRouter.initArduino()
})

