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

	user.name = req.body.objPlayerData.name;
	user.email = req.body.objPlayerData.email;

	// Check for existence
	User.count({email: user.email}, function (err, count) {
		if (count > 0) {
			res.status(200);
			res.json({
				'isExisted': true
			});
		} else {
			user.setBalance(req.body.objPlayerData.balance);
			user.setWins(req.body.objPlayerData.wins);
			user.setPassword(req.body.objPlayerData.password);
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

module.exports.updatePlayerData = function (req, res) {
	if (!req.body.objPlayerData.email) {
		res.status(401).json({
			"message": "UnauthorizedError: unauthorized attempt to update player data"
		});
	} else {
		User.findOne({email: req.body.objPlayerData.email}, function (err, user) {
			user.name = req.body.objPlayerData.name;
			user.email = req.body.objPlayerData.email;
			user.setBalance(req.body.objPlayerData.balance);
			user.setWins(req.body.objPlayerData.wins);
			user.setPassword(req.body.objPlayerData.password);
			user.save(function (err, user) {
				res.status(200).json(user);
			});
		});
	}
};