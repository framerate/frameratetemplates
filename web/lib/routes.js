'use strict';

module.exports = function(app)
{
	app.get('/', function(req, res)
	{
	  var body = 'Hello World';
	  res.setHeader('Content-Type', 'text/plain');
	  res.setHeader('Content-Length', body.length);
	  res.end(body);
	});
};