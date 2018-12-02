/**
 * Created by Mihail on 9/14/2016.
 */
const mongoose = require('mongoose');
let gracefulShutdown;
const dbURI = 'mongodb://127.0.0.1/bingo-bigul';
const db = mongoose.connection;

mongoose.connect(dbURI,  { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

db.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
db.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});
db.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

gracefulShutdown = function (msg, callback) {
  db.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});

require('./users');
require('./admins');