'use strict';
var user = require('../models/user.js');



function UsersController() {

	this.register = function(req, res) {
		if (req.body.password != req.body.passwordconfirm) {
			res.json({
				errors: { password: { message: 'Passwords must match!' } }
			});
		} else {

			user.create({ 
				'email': req.body.email,
				'first_name': req.body.first_name,
				'last_name': req.body.last_name,
				'password': req.body.password,
				})
		}
	}

	this.login = function(req, res) {
		User.find({	email: req.body.email	}, function(err, user) {
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
