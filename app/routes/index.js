'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();
	var pollHandler = new PollHandler();
	
	// general routes
	app.route('/')
		.get(function (req, res) {
			res.render(path + '/public/index.ejs', { 
				isAuthed: req.isAuthenticated()
			});
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
		.get(pollHandler.getOptionsList, function(req, res){
			res.render(path + '/public/poll.ejs', {
			    options: req.params.result,
			    isAuthed: req.isAuthenticated()
			});
		});
	
	app.route('/newpoll')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/newpoll.html');
		});
		
	app.route('/submit-form')
		.get(isLoggedIn, pollHandler.addPollAndRedirect);
		
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
			if(req.user){
				res.json(req.user.github);
			}
			else {
				res.json(null);
			}
		});
	
	app.route('/api/poll/:pollid')
		.get(pollHandler.addVote)
};
