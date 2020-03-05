const passport = require('passport');
const mongoose = require('mongoose');
const Admin = mongoose.model('Admins');

module.exports.register = function (req, res) {
	const admin = new Admin();

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
				const token = admin.generateJwt();
				res.status(200);
				res.json({
					'token': token
				});
			});
		}
	});
};

module.exports.loginAdmin = function (req, res) {
	passport.authenticate('adminLogin', function (err, admin, info) {
		let token;

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
