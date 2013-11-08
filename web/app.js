'use strict';

var express = require('express');

var app = express();

require('./lib/routes')(app);

app.listen(3000);