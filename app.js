'use strict';

// third-party requires
var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var app = express();

// internal requires
var config = require('./config.json');

// express settings
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.cookieParser('moooooooo!'));
app.use(express.session({ key: 'sid', cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.locals.message = '';

// connect to the local database
mongoose.connect(config.database.ip, config.database.name);

// setup routes
require('./lib/routes')(app);

// Output is important for grunt to know the
// server has started
app.listen(config.server.port);
console.log(config.project.name + ' listening on port ' + config.server.port);
