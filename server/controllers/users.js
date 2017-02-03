var mongoose = require('mongoose'),
		User = mongoose.model('User');

function UsersController() {

	this.register = function(req, res) {
		console.log("REQ BODY#########",req.body)
		
		if (req.body.password != req.body.passwordconfirm) {
			res.json({
				errors: { password: { message: 'Passwords must match!' } }
			});
		} else {
			console.log("Made it in the pELSE")
			var newUser = new User({
				email: req.body.email,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				password: req.body.password
				// birthday: 	req.body.birthday
			})
			console.log("newUser", newUser);

			newUser.save(function(err, user) {
				if (err) {
					console.log("errrrr", err)
					if (11000 === err.code) {
						res.json({
							errors: {	email: { message: 'Email address is in use.  Please use a different email address.'	}	}
						});
					} else {
						console.log("----- ELSE")
						res.json(err);
					}
				} else {
					returnedUser = {
						user_id: 		user._id,
						first_name: user.first_name,
						last_name: 	user.last_name,
						email: 			user.email
						// birthday: 	user.birthday
					}
					console.log("USErrrrrrrrrrr",returnedUser)
					res.json(returnedUser);
				}
			})
		}
	}

	this.login = function(req, res) {
		console.log("REQ BODY#########",req.body)
		User.find({	email: req.body.email}, function(err, user) {
			if (err) {
				res.json(err);
			} else if (user[0]) {
				user = user[0];
				user.comparePassword(req.body.password, user.password, function(ret) {
					console.log("**************************");
					console.log("ret = ", ret);
					console.log("**************************");
					if (ret == true) {
						console.log("******MADE IT********************");
						returnedUser = {
							id: 				user._id,
							first_name: user.first_name,
							last_name: 	user.last_name,
							email: 			user.email,
							birthday: 	user.birthday
						}
						res.json(returnedUser);
					} else {
						res.json({ errors: { Register: { message: 'Wrong password entered.'	}	}
						});
					}
				})
			} else {
				res.json({
					errors: {	Register: {	message: 'That user does not to exist.'	}	}
				})
			}
		})
	}
}

module.exports = new UsersController;
