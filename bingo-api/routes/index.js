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
var ctrlBackOffice = require('../controllers/back-office');
var ctrlAdminsAuth = require('../controllers/admins-auth');
router.get('/getPlayersData', auth, ctrlBackOffice.getPlayersData);
router.post('/createPlayer', auth, ctrlBackOffice.createPlayer);
router.post('/deletePlayer', auth, ctrlBackOffice.deletePlayer);
router.post('/updatePlayerData', auth, ctrlBackOffice.updatePlayerData);
router.post('/loginAdmin', ctrlAdminsAuth.loginAdmin);
// Disabled for security reasons - for the moment the admins will be added only manually
// router.post('/registerAdmin', ctrlAdminsAuth.register);

// Main app
var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/users-auth');
router.post('/setNewBalance', auth, ctrlProfile.setNewBalance);
router.get('/profile', auth, ctrlProfile.profileRead);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/setWins', ctrlAuth.setNewWins);

module.exports = router;