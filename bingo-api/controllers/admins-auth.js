/**
 * Created by Mihail on 12/10/2016.
 */
var passport = require('passport');
var mongoose = require('mongoose');
var Admin = mongoose.model('Admins');

module.exports.register = function (req, res) {
	var admin = new Admin();

	admin.name = req.body.name;
	admin.email = req.body.email;

	// Check for existence
	Admin.count({email: admin.email}, function (err, count) {
		if (count > 0) {
			res.status(200);
			res.json({
				'isExisted': true
			});
		} else {
			admin.setPassword(req.body.password);
			admin.save(function (err) {
				var token = admin.generateJwt();
				res.status(200);
				res.json({
					'token': token
				});
			});
		}
	});
};

module.exports.login = function (req, res) {
	passport.authenticate('local', function (err, admin, info) {
		var token;

		if (err) {
			res.status(404).json(err);
			return;
		}

		if (admin) {
			token = admin.generateJwt();
			res.status(200);
			res.json({
				'token': token
			});
		} else {
			res.status(401).json(info);
		}
	})(req, res);
};