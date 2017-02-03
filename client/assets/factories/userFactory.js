app.factory('userFactory', ['$http', function($http){
	var user = {};
	function UserFactory(){
		var self = this

		this.register = function(newUser, callback){
			console.log("Before",newUser);
			newUser.email = newUser.email.toLowerCase();
			console.log("After",newUser);
			return $http.post('/register', newUser).then(function(ret){
				if(ret.errors){
					return ret;
				} else {
					user = ret.data;
					return user;
				}
			})

			users.push(newUser);
			callback(newUser)
		}

		this.checkUser = function(callback){
			callback(user);
		}

		this.login = function(attempt){
			console.log("Attempt",attempt)
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