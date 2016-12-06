/**
 * Created by Mihail on 12/4/2016.
 */
"use strict";

var mongoose = require('mongoose');
var User = mongoose.model('Users');

module.exports.getPlayersData = function (req, res) {
	User
		.find()
		.exec(function (err, allUsers) {
			res.status(200).json(allUsers);
		});
};

module.exports.createPlayer = function (req, res) {
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
			user.setBalance(req.body.balance);
			user.setWins(req.body.wins);
			user.setPassword(req.body.password);
			user.save(function (err) {
				var token = user.generateJwt();
				res.status(200);
				res.json({
					'token': token
				});
			});
		}
	});
};

module.exports.deletePlayer = function (req, res) {
	if (!req.body.email) {
		res.status(401).json({
			"message": "Non existing user"
		});
	} else {
		User
			.remove({"email": req.body.email})
			.exec(function (err, data) {
				res.status(200).json(data);
			});
	}
};