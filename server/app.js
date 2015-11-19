'use strict';

var config = global.config = require('../Config.json');
var express = require('express');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var expressHandlebars = require('express-handlebars');
var path = require('path');
var serveStatic = require('serve-static');

var mongoose = require('mongoose');
var uuid = require('node-uuid');

var app = express();
var http = require('http');
var isProduction = process.env.NODE_ENV === 'production' || false;
var port = isProduction ? 8080 : 3000;

var server;

var uri = require('./helpers/mongodb').createURI(config.databases.mongo);
mongoose.connect(uri, config.databases.mongo.options);

// webpack real time stuff
if (!isProduction) {
    var httpProxy = require('http-proxy');
    var proxy = httpProxy.createProxyServer({
        changeOrigin: true
    });
    // We require the bundler inside the if block because
    // it is only needed in a development environment. Later
    // you will see why this is a good idea
    var bundle = require('./bundle.js');
    bundle();

    app.all('/socket.io*', function (req, res) {
        proxy.web(req, res, {
            target: 'http://127.0.0.1:3001'
        });
    });
    // Any requests to localhost:3000/build is proxied
    // to webpack-dev-server
    app.get('/js/*.js', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080/'
        });
    });


    proxy.on('error', function () {
        // Just catch it
    });

    // We need to use basic HTTP service to proxy
    // websocket requests from webpack
    server = http.createServer(app);

    server.on('upgrade', function (req, socket, head) {
        proxy.ws(req, socket, head);
    });
}

var sessionTTLSeconds = 1 * 24 * 60 * 60;
var storeOptions = {
    host: config.databases.redis.server,
    port: config.databases.redis.port,
    db: config.databases.redis.database || 0,
    ttl: sessionTTLSeconds
};
if (config.databases.redis.password) {
    storeOptions.pass = config.databases.redis.password;
}
app.use(serveStatic(path.join(__dirname, '../../static'), {index: false, redirect: true}));
app.use(session({
    store: new RedisStore(storeOptions),
    genid: function () {
        return uuid.v4();
    },
    secret: 'ff4a588e-0e3b-4698-817c-7191de36862c',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: sessionTTLSeconds * 1000
    }
}));




var handlebars = expressHandlebars.create({
    layoutsDir: path.join(__dirname, './views/layout'),
    partialsDir: path.join(__dirname, './views/partial'),
    defaultLayout: 'main'

});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

// @TODO - move this
var React = require('react');
var ReactDOM = require('react-dom/server');
require('babel/register');
var Header = React.createFactory(require('../src/js/components/Header.jsx'));
var Footer = React.createFactory(require('../src/js/components/Footer.jsx'));

app.get('*', function (request, response) {
    var headerHTML = ReactDOM.renderToStaticMarkup(Header({}));
    var footerHTML = ReactDOM.renderToStaticMarkup(Footer({}));
    return response.render('root', {
        header: headerHTML,
        footer: footerHTML
    });
});

if (!isProduction) {

    server.listen(port, function () {
    });
} else {
    server = app.listen(port);
}
