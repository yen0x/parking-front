'use strict';

var app = angular.module('parking.services.auth', []);

app.service('Auth', [ '$window', function($window) {
    var user = $window.sessionStorage.userMail;
    return {
        getUser: function() {
            return user;
        },
        setUser: function(newUser) {
            $window.sessionStorage.userMail = newUser;
            user = newUser;
        },
        isConnected: function() {
            return !!user;
        }
    };
}]);