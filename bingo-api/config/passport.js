const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('Users');
const Admin = mongoose.model('Admins');

passport.use('userLogin', new LocalStrategy({
		usernameField: 'email'
	},
	function(username, password, done) {
		User.findOne({ email: username }, function (err, user) {
			if (err) { return done(err); }

			if (!user) {
				return done(null, false, {
					message: 'User not found'
				});
			}

			if (!user.validPassword(password)) {
				return done(null, false, {
					message: 'Password is wrong'
				});
			}

			return done(null, user);
		});
	}
));

passport.use('adminLogin', new LocalStrategy({
		usernameField: 'email'
	},
	function(username, password, done) {

		Admin.findOne({ email: username }, function (err, admin) {
			if (err) { return done(err); }

			if (!admin) {
				return done(null, false, {
					message: 'Admin not found'
				});
			}

			if (!admin.validPassword(password)) {
				return done(null, false, {
					message: 'Password is wrong'
				});
			}

			return done(null, admin);
		});
	}
));
