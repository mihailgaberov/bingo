/**
 * Created by Mihail on 12/4/2016.
 */
"use strict";

var mongoose = require('mongoose');
var User = mongoose.model('Users');

module.exports.getAllUsers = function (req, res) {
	User
		.find()
		.exec(function (err, allUsers) {
			res.status(200).json(allUsers);
		});
};