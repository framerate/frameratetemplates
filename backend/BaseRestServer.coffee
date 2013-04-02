# Base Rest Server Class
# 	Requires: 
# 		Restify (rest API library)
# 		Mongoose (mongoDB mapper)
# 		MongoDB running on the server.	
# 	Author: Justin Reynard (framerate@gmail.com)

restify  = require("restify")
mongoose = require('mongoose')

class BaseRestServer
	_api_test: (req, res, next) ->
		console.log "test_response fired"
		res.send "The API Is working."

	setup_routes: () ->
		@server.get "/hello", @_api_test

	setup_schemas: () ->
		console.log "WARNING: You should be overriding setup_schemas()!"

	save_object: (obj) ->
		obj.save (err) ->
			if err then console.log 'Error Found while Saving'


	constructor: (params) ->
		if typeof params is 'object'
      		@options[option] = value for option, value of params

		@server = restify.createServer({name: 'BaseRestServer'})
		mongoose.connect 'localhost', 'test'
		@setup_routes()
		@setup_schemas()
		@server.listen 8080, =>
    		console.log "%s is listening at %s", @server.name, @server.url

root = exports ? window
root.BaseRestServer = BaseRestServer
		

#test override
class TestRest extends BaseRestServer
	setup_schemas: () ->
		console.log 'setting up schema!'
		@schema = mongoose.Schema({ name: 'string' })

	setup_routes: () ->
		@server.get "/test/:name", @_test_schema
		super

	_test_schema: (req, res, next) =>
		console.log "Attempting to write to DB..."
		Cat = mongoose.model('Cat', @schema)
		kitty = new Cat({name: req.params.name})
		@save_object(kitty)
		console.log "Done..."
		res.send "Finished test ( #{req.params.name})."

#start the server
rs = new TestRest()
