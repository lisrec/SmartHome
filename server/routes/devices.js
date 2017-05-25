var express = require('express');
var router 	= express.Router();
var PythonShell = require('python-shell');

var db 		= require('../db.js');

router.get('/', function(req, res, next) {
	//console.log(req.body);
	res.json({text:"some"});

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



