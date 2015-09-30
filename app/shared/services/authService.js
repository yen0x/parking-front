'use strict';

var app = angular.module('parking.services.auth', []);

app.service('Auth', [ '$window', function($window) {
    var user = $window.sessionStorage.userMail;
    var firstname = $window.sessionStorage.userFirstname;
    var token = $window.sessionStorage.userToken;

    return {
        getUser: function() {
            return user;
        },
        setUser: function(newUser) {
            $window.sessionStorage.userMail = newUser;
            user = newUser;
        },
        getFirstname: function() {
            return firstname;
        },
        setFirstname: function(firstname) {
            $window.sessionStorage.userFirstname = firstname;
        },
        getToken: function() {
            return token;
        },
        setToken: function(token) {
            $window.sessionStorage.userToken= token;
        },
        isConnected: function() {
            return !!user;
        }
    };
}]);
