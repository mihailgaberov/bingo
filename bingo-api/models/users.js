/**
 * Created by Mihail on 9/14/2016.
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
require('dotenv').config();

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	hash: String,
	salt: String,
	balance: {
		type: Number,
		required: true
	},
	wins: {
		type: Number,
		required: true
	}
});

userSchema.methods.setBalance = function(amount) {
	this.balance = amount;
};

userSchema.methods.setWins = function(count) {
	this.wins = count;
};

userSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		balance: this.balance,
		wins: this.wins,
		exp: parseInt(expiry.getTime() / 1000)
	},  process.env.DB_SECRET);
};

userSchema.methods.setWins = function(amount) {
	this.wins = amount;
};

mongoose.model('Users', userSchema);