/**
 * Created by Mihail on 8/19/2016.
 */
'use strict';

const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.get('/config', (request, response) => {
	response.send('Let the party begin!');

	fs.readFile('../../config.json', 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}
		console.log(data);
	});
});

app.listen(port, (err) => {
	if (err) {
		return console.log('Error connecting to server: ', err);
	}

	console.log(`The server is listening on: ${port}`)
});