'use strict';

var app = angular.module('parking.controllers');

app.controller('SignupController', ['$scope', function ($scope) {
  $scope.infos = {
    email: '',
    firstname: '',
    password: ''
  };

  $scope.showErrors = {};

  $scope.checkPassword = function() {
    if ($scope.infos.password.length < 8) {
      $scope.showErrors.password = 'Not enough characters.';
    }
  };
  $scope.submit = function() {
  };
}]);
