app.factory('userFactory', ['$http', function($http){
	var user = {};
	function UserFactory(){
		var self = this
		var users = [];

		this.register = function(newUser, callback){
			console.log(newUser);
			// return $http.post('/register', newUser).then(function(ret){
			// 	if(ret.errors){
			// 		return ret;
			// 	} else {
			// 		user = ret.data;
			// 		return user;
			// 	}
			// })

			users.push(newUser);
			callback(newUser)
		}

		this.checkUser = function(callback){
			callback(user);
		}

		this.login = function(attempt){
			if (attempt.email) {
				attempt.email = attempt.email.toLowerCase();
			}
			return $http.post('/login', attempt).then(function(ret){
				console.log("UserFactory.login: (attempt)", attempt)
				if(ret.errors || ret.data.pwmatch == false){
					return ret;
				} else {
					console.log("UserFactory.login (ret.data) ", ret.data)
					user = ret.data;
					return user;
				}
			})
	}

	this.logout = function(callback){
		user = {};
		callback();
	}

}
	return new UserFactory();
}])