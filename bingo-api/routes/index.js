const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
require('dotenv').config();

const auth = jwt({
	secret: process.env.DB_SECRET,
	userProperty: 'payload'
});

// Back office app
const ctrlBackOffice = require('../controllers/back-office');
const ctrlAdminsAuth = require('../controllers/admins-auth');
router.get('/getPlayersData', auth, ctrlBackOffice.getPlayersData);
router.post('/createPlayer', auth, ctrlBackOffice.createPlayer);
router.post('/deletePlayer', auth, ctrlBackOffice.deletePlayer);
router.post('/updatePlayerData', auth, ctrlBackOffice.updatePlayerData);
router.post('/loginAdmin', ctrlAdminsAuth.loginAdmin);
// Disabled for security reasons - for the moment the admins will be added only manually
// router.post('/registerAdmin', ctrlAdminsAuth.register);

// Main app
const ctrlProfile = require('../controllers/profile');
const ctrlAuth = require('../controllers/users-auth');
router.post('/setNewBalance', auth, ctrlProfile.setNewBalance);
router.get('/profile', auth, ctrlProfile.profileRead);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/setWins', auth, ctrlProfile.setWins);

module.exports = router;
