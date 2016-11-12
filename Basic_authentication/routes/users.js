var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// register
router.get('/register', function(req, res){
	res.render('register');
});

// login
router.get('/login', function(req, res){
	res.render('login');
});

// register new users
router.post('/register', function(req, res){
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var confirm = req.body.confirm;

	// form field validation
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('confirm', 'Passwords do not match').equals(req.body.password);
	var errors = req.validationErrors();
	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			username: username,
			email: email,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'Registration successful! Proceed with login...');
		res.redirect('/users/login');
	}
});

// Reference - http://passportjs.org/docs/username-password
passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	 });
   });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// Reference - http://passportjs.org/docs/authenticate
router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash: true}),
  function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'Logout successful');
	res.redirect('/users/login');
});

module.exports = router;