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

// Back office app
// TODO: add auth check for logged admins in order to be able to execute these operations
var ctrlBackOffice = require('../controllers/back-office');
router.get('/getPlayersData', ctrlBackOffice.getPlayersData);
router.post('/createPlayer', ctrlBackOffice.createPlayer);
router.post('/deletePlayer', ctrlBackOffice.deletePlayer);

// Main app
var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
router.post('/setNewBalance', auth, ctrlProfile.setNewBalance);
router.get('/profile', auth, ctrlProfile.profileRead);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;