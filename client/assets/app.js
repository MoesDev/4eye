var app = angular.module('app', ['ngRoute','ngCookies']);

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'partials/api.html',
      controller: 'apiController',
      controllerAs: 'aC'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      controllerAs: 'lC'
    })
    .otherwise({
      redirectTo: '/login'
    })
});

