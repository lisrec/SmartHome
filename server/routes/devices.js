var express = require('express');
var router 	= express.Router();
var PythonShell = require('python-shell');
var SerialPort = require("serialport");




var port = new SerialPort("/dev/ttyACM0", {
  parser: SerialPort.parsers.readline('\n')
});

var db 		= require('../db.js');


port.on('data', function (data) {
  console.log('Data: ' + data);
});

router.get('/', function(req, res, next) {

	port.write('deviceInit(0,true,9,10,11);');
	//console.log(req.body);
	res.json({text:"test"});

});

router.get('/ports', function(req, res, next) {

	var SerialPort = require('serialport');
	SerialPort.list(function (err, ports) {
		res.json(ports);
	});

});

router.post('/', function(req, res, next) {
	
	var id,pwm,pin1,pin2,pin3;

	id =  req.body.id;
	pwm =  req.body.pwm;
	pin1 =  req.body.pin1;
	pin2 =  req.body.pin2;
	pin3 =  req.body.pin3;

	var data = 'deviceInit(' + id + ',' + pwm + ',' + pin1 + ',' + pin2 + ',' + pin3+ ');';

	port.write(	data, function () {
    	port.drain( function() {
    		res.status(204).end();

    	});
  	});

});

router.post('/:deviceId/lights', function(req, res, next) {

	var id,R,G,B,time;

	id = req.params.deviceId;
	R = req.body.R;
	G = req.body.G;
	B = req.body.B;

	time = req.body.time;

	var data = 'ledTime(' + id + ',' + R + ',' + G + ',' + B + ',' + time + ');';

	port.write(	data, function () {
    	port.drain( function() {
    		res.json(data).status(200).end();
    	});
  	});
	
});

router.post('/test', function(req, res, next) {

	var options = {
	  scriptPath: '../scripts',
	  args: ['value1', 'value2', 'value3']
	};

	PythonShell.run('my_script.py', options, function (err, results) {
	  if (err) throw err;
	  // results is an array consisting of messages collected during execution
	  console.log('results: %j', results);
	  res.json(results);
	})

});

module.exports = router;



