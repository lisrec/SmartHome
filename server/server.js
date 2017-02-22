var express 	= require('express');
var path 		= require('path');
var bodyParser 	= require('body-parser');
var morgan      = require('morgan');
var jwt			= require('jsonwebtoken');
var _ 			= require('lodash');

var config = require('./config');
var auth = require('./routes/auth');
//var route = require('./routes/route');


var app = express();

var _port = 3300;

app.set('superSecret', config.secret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
	if ('OPTIONS' == req.method) {
		res.sendStatus(200);
	}
	else {
		next();
	}
});

app.use('/api/auth', function(req,res,next) {
		req.jwt = jwt;
		req.secret = app.get('superSecret');
		next();
	}, auth);

app.use(function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });    
			} else {
				req.decoded = decoded;    
				next();
			}
		});
	} else {
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.' 
		});
	}
});

//app.use('/api/route', route);

app.get('*', function(req, res){
	res.send('server');
});


app.listen(_port, function(){
	console.log('Server started on ' + _port);
});

