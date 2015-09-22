'use strict';

var app = angular.module('parking.controllers');

app.controller('NavbarController', ['$scope', 'Auth', function ($scope, Auth) {
  $scope.isConnected = function() {
    return Auth.isConnected();
  };

  $scope.getFirstname = function() {
    return Auth.getFirstname();
  };
}]);

