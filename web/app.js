'use strict';

var express = require('express');

var app = express();

app.get('/hello.txt', function(req, res){
  var body = 'This is Working.';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);

});

app.listen(3000);