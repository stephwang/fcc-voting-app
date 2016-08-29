'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');

module.exports = function (app, passport) {

	function loginRedirect (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}
	
	function isLoggedIn (req, res) {
		if (req.isAuthenticated()) {
			return true;
		} else {
			return false;
		}
	}

	var clickHandler = new ClickHandler();
	var pollHandler = new PollHandler();
	
	// general routes
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});
	
		
	// poll routes
	app.route('/poll/:pollid')
		.get(pollHandler.getOptionsList);
	
	app.route('/newpoll')
		.get(loginRedirect, function (req, res) {
			res.sendFile(path + '/public/newpoll.html');
		});
		
	app.route('/submit-form')
		.get(loginRedirect, pollHandler.addPollAndRedirect);
		
	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	// api routes
	app.route('/api/pollslist')
		.get(pollHandler.getPollsList);

	app.route('/api/user/:id')
		.get(function (req, res) {
			res.json(req.user.github);
		});
	
	app.route('/api/poll/:pollid')
		.get(pollHandler.addVote)
};
