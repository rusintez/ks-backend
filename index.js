
/*!
 * KS Backend Server
 * Express wrapper for ks app
 * Copyright(c) 2013 Vladimir Popov rusintez@gmail.com
 */


/**
 * Module dependencies.
 */

var express   = require('express'),
    socketio  = require('socket.io'),
    http      = require('http'),
    fs        = require('fs');
                require('colors');


/**
 * Initialization
 */
    
var app     = express(),
    server  = http.createServer(app),
    io      = socketio.listen(server);

// server.listen(port);
app.enable('strict routing');

io.set('log level', 1);
io.set('transports', ['xhr-polling']);


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
 * Never go down
 * Write to error log
 */

process.on('uncaughtException', function(err) {
  console.log(JSON.stringify(err));
  fs.createWriteStream('./error.log', {'flags': 'a'}).write(err.toString() + '\n');
});


/*
 * Mount apps
 */

var mount = function(namespace, application) {
  app.all(namespace, function(req, res) { res.redirect(namespace + '/'); });
  app.use(namespace + '/', application(io.of(namespace)));
}


/*
 * Exports
 */

exports = module.exports = {
  app: app,
  server: server,
  socketio: io,
  express: express,
  mount: mount
};
