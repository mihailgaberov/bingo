const mongoose = require('mongoose');
let gracefulShutdown;
const db = mongoose.connection;

mongoose
  .connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected.'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });
mongoose.set('useCreateIndex', true);

db.on('connected', function () {
  console.log('Mongoose connected to ' + process.env.DB_URI);
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
