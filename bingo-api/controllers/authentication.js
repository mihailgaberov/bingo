/**
 * Created by Mihail on 9/14/2016.
 */
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('Users');

module.exports.register = function (req, res) {
	var user = new User();

	user.name = req.body.name;
	user.email = req.body.email;

	// Check for existence
	User.count({email: user.email}, function (err, count) {
		if (count > 0) {
			res.status(200);
			res.json({
				'isExisted': true
			});
		} else {
			user.setBalance(50);
			user.setPassword(req.body.password);
			user.save(function (err) {
				var token;
				token = user.generateJwt();
				res.status(200);
				res.json({
					'token': token
				});
			});
		}
	});
};

module.exports.login = function (req, res) {

	passport.authenticate('local', function (err, user, info) {
		var token;

		if (err) {
			res.status(404).json(err);
			return;
		}

		if (user) {
			token = user.generateJwt();
			res.status(200);
			res.json({
				'token': token
			});
		} else {
			res.status(401).json(info);
		}
	})(req, res);
};