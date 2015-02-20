'use strict';

var fs = require('fs');
require('colors');

// make sure the config file exists
if (!fs.existsSync(__dirname + '/Config.json')) {
    console.log('Cannot start Karma Web, missing Config.json! - Creating one!'.red);
    fs.writeFileSync(__dirname + '/Config.json',
		fs.readFileSync(__dirname + '/Config.example.json')
	);
}

var config = require(__dirname + '/Config.json');

// third-party requires
var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

// express middleware
var serveStatic         = require('serve-static');
var session             = require('express-session');
var bodyParser          = require('body-parser');

var sessionConfig = {
    'secret': 'ronburgundy!',
    'resave': false,
    'saveUninitialized': false
};

// internal requires
var config = require('./config.json');

// express settings
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(serveStatic(__dirname + '/static', {'index':false}));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// connect to the local database
mongoose.connect(config.database.ip, config.database.name);

// setup routes
require('./lib/routes')(app);

// Output is important for grunt to know the
// server has started
app.listen(config.server.port);
console.log(config.project.name + ' listening on port ' + config.server.port);
