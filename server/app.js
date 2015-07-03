/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var net = require('net');
var packetParse = require('./api/packet/packet.parse');


// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);

require('./config/express')(app);
require('./routes')(app);


// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});



//tcp server 
var netserver = net.createServer(function(socket) {
	socket.setEncoding('utf8');
	socket.setKeepAlive(true,0);
	socket.write('XenonTCP\r\n');
	
	
	socket.on('data',function(data){
		packetParse(data);
		socket.write('ACK1');
	});

	socket.on('error',function(err){
		console.log(err);
	})
	
});
 
netserver.listen(1337, '127.0.0.1');

// Expose app
exports = module.exports = app;