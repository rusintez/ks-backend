
/*!
 * KS Backend Server
 * Express wrapper for ks app
 * Copyright(c) 2013 Vladimir Popov rusintez@gmail.com
 */

var port = global.ks_port || 3000;


/**
 * Module dependencies.
 */

var express   = require('express'),
    socketio  = require('socket.io'),
    http      = require('http');
                require('colors');


/**
 * Initialization
 */
    
var app     = express(),
    server  = http.createServer(app),
    io      = socketio.listen(server);

server.listen(port);

io.set('log level', 1);
io.set('transports', ['xhr-polling']);


/*
 * Don't serve static files here
 */

// app.use(express.static(__dirname + '/build'));


/*
 * Logging
 */

app.use(function(req, res, next){
  process.stdout.write(['>',
    req.method.toString().green, 
    req.url.toString().grey].join(' '));
  next();
  process.stdout.write([' ', res.statusCode, '\n'].join(''));
});


/*
 * Exports
 */

exports = module.exports = {
  app: app,
  server: server,
  socketio: io,
  express: express
};


console.log('Server is listening on port', port, '\n');