const express 	= require('express')
const PortControler = require('./portConnection')
const SerialPort = require('serialport')
const _port = 3301

var app = express()



app.listen(_port, function(){
	console.log('Server started on ' + _port)
	PortControler.initArduino(SerialPort)
})

