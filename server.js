const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const passport = require('passport');

require('./bingo-api/models/db');
require('./bingo-api/config/passport');

const routesApi = require('./bingo-api/routes/index');

const app = express();

const allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
	next();
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(passport.initialize());
app.use('/bingo-api', routesApi);

app.use(function(req, res) {
	res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.use(function (err, req, res) {
	if (err.name === 'UnauthorizedError') {
		res.status(401);
		res.json({"message" : err.name + ": " + err.message});
	}
});


app.listen(8888);
