'use strict';
var setupFacebook = require('./setupFacebook.js');

function requireAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
		req.flash('info', 'You must be logged in to do that!');
        res.redirect('/');
    }
}

module.exports = function(app)
{
	// setup facbeook login
	setupFacebook(app);

	// index/root view
	app.get('/', function(req, res) {
		// console./log(req.flash('info')[0]);
		res.render('index.ejs', {message: req.flash('info')[0]});
	});

	// logout to clear the sessions
	app.get('/logout', function(req, res) {

        req.session = null;
        res.redirect('/');
    });

	// restricted "home" view
	app.get('/home', requireAuth, function(req, res){
		res.render('home.ejs');
	});
};
