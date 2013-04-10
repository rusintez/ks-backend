
/*!
 * KS Backend
 * 
 * Copyright(c) 2013 Vladimir Popov rusintez@gmail.com
 */


/**
 * Module dependencies.
 */

var bootstrap       = require('./'),
    app             = bootstrap.app,
    io              = bootstrap.socketio;


/**
 * Example Mounts
 * app.use('/query-builder', queryBuilderApp);
 */


/*
 * Exports
 */

exports = module.exports = bootstrap;
