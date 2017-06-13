var express = require('express')
var router 	= express.Router()
var PythonShell = require('python-shell')
var SerialPort = require("serialport")

var port = null

router.initArduino = () => {
	SerialPort.list(function (err, ports) {
		if(!err) {
			ports.forEach((device) => {
				if(device.manufacturer && device.manufacturer.toLowerCase().indexOf("arduino") !== -1) {
					port = new SerialPort(device.comName, {
						parser: SerialPort.parsers.readline('\n')
					})
					port.on('data', function (data) {
						console.log('Data: ' + data)
					})
				}
			})
		} else {
			console.log("Cannot load SerialPort.")
		}
	})
}

router.deinitArduino = (callback) => {
	port.close(() => {
		callback(true)
	})
}


router.get('/ports', (req, res, next) => {
	SerialPort.list((err, ports) => {
		res.json(ports)
	})
})

router.get('/testinit/:devId', (req, res, next) => {
	
	let devId = req.params.devId
	let data = 'deviceInit(' + devId + ',true,2,3,4);'
	port.write(data, () => {
		port.drain(() => {
    		res.status(201).end()
    	})
	})
})

router.post('/init', (req, res, next) => {
	
	let id, pwm, pin1, pin2, pin3

	id =  req.body.id
	pwm =  req.body.pwm
	pin1 =  req.body.pin1
	pin2 =  req.body.pin2
	pin3 =  req.body.pin3

	let data = 'deviceInit(' + id + ',' + pwm + ',' + pin1 + ',' + pin2 + ',' + pin3+ ');'

	port.write(data, () => {
    	port.drain(() => {
    		res.status(201).end()
    	})
  	})
})

router.post('/:deviceId/lights', (req, res, next) => {

	let id, R, G, B, time

	id = req.params.deviceId
	R = req.body.R
	G = req.body.G
	B = req.body.B

	time = req.body.time

	let data = 'ledTime(' + id + ',' + R + ':' + G + ':' + B + ',' + time + ');'

	port.write(	data, function () {
    	port.drain( function() {
    		res.json(data).status(200).end()
    	})
  	})
})

router.post('/enable/:deviceId', (req, res, next) => {

	let id, enable

	id = req.params.deviceId
	enable = req.body.enable

	let data = 'enable(' + id + ',' + enable + ');'

	port.write(	data, function () {
    	port.drain( function() {
    		res.json(data).status(200).end()
    	})
  	})
})

router.get('/getStatus/:deviceId', (req, res, next) => {

	let id = req.params.deviceId
	let data = 'showDevice(' + id + ');'

	port.write(	data, function () {
    	port.drain( function() {
    		res.json(data).status(200).end()
    	})
  	})
})

router.post('/pythonTest', (req, res, next) => {

	let options = {
	  scriptPath: '../scripts',
	  args: ['value1', 'value2', 'value3']
	}

	PythonShell.run('my_script.py', options, (err, results) => {
		if (err) throw err
		console.log('results: %j', results)
		res.json(results)
	})
})

module.exports = router



