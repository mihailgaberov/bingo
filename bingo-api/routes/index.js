/**
 * Created by Mihail on 9/14/2016.
 */
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
require('dotenv').config();

var auth = jwt({
	secret:  process.env.DB_SECRET,
	userProperty: 'payload'
});


var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

router.get('/profile', auth, ctrlProfile.profileRead);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;