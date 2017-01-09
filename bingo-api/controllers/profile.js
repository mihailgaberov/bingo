/**
 * Created by Mihail on 9/14/2016.
 */
var mongoose = require('mongoose');
var User = mongoose.model('Users');

module.exports.profileRead = function (req, res) {
	// If no user ID exists in the JWT return a 401
	if (!req.payload._id) {
		res.status(401).json({
			"message": "UnauthorizedError: private profile"
		});
	} else {
		// Otherwise continue
		User
			.findById(req.payload._id)
			.exec(function (err, user) {
				res.status(200).json(user);
			});
	}
};

module.exports.setNewBalance = function (req, res) {
	if (!req.payload._id) {
		res.status(401).json({
			"message": "UnauthorizedError: unauthorized attempt to set balance"
		});
	} else {
		User.findOne({email: req.body.email}, function (err, user) {
			if (req.body.spending) {
				user.setBalance(user.balance - req.body.newSum);
			} else {
				user.setBalance(user.balance + req.body.newSum);
			}

			user.save(function (err, user) {
				res.status(200).json(user);
			});
		});
	}
};

module.exports.setNewWins = function (req, res) {
	if (!req.payload._id) {
		res.status(401).json({
			"message": "UnauthorizedError: unauthorized attempt to set wins"
		});
	} else {
		User.findOne({email: req.body.email}, function (err, user) {
			user.setWins(user.wins + req.body.wins);

			user.save(function (err, user) {
				res.status(200).json(user);
			});
		});
	}
};
