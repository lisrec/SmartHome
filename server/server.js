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
const usersRouter = require('./routes/users')
const roomsRouter = require('./routes/rooms')
const inputsRouter = require('./routes/inputs')
const pinSettingsRouter = require('./routes/pinSettings')
const schedulesRouter = require('./routes/schedules')
//var route = require('./routes/route')
var app = express()

var _port = 3300

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
app.use("/api/users", usersRouter)
app.use("/api/rooms", roomsRouter)
app.use("/api/pinSettings", pinSettingsRouter)
app.use("/api/devices", devicesRouter)
app.use("/api/inputs", inputsRouter)
app.use("/api/schedules", schedulesRouter)

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

app.listen(config.port, function(){
	console.log('Server started on ',config.port)
	checkDB.updateDB()
	//devicesRouter.initArduino()
})

