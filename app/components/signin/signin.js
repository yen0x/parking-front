'use strict';

var app = angular.module('parking.controllers');

app.controller('SigninController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  $scope.form = {};
  $scope.showErrors = {};

  $scope.checkEmail = function() {
    if (!$scope.form.email || $scope.form.email.length == 0 ||
        ($scope.form.email.indexOf('@') == -1 || $scope.form.email.indexOf('.') == -1)) {
      $scope.showErrors.email = 'Please fill your email.';
    } else {
      delete $scope.showErrors.email;
    }
  };

  $scope.submit = function() {
    $scope.showErrors = {};
    $scope.checkEmail();


    if (Object.keys($scope.showErrors).length > 0) {
      return;
    }

    // resetss the errors
    $scope.showErrors = {};

    $http.post('/api/login', {
          email: $scope.form.email,
          password: $scope.form.password
        })
        .then(function(response) {
          $location.path('/dashboard');
        }, function(response) {
          switch (response.status) {
            case 400:
            case 403:
              $scope.showErrors.general = 'Wrong email/password.';
              break;
            default:
              $scope.showErrors.general = 'Oops! System error, please try again.';
          }
        });
  };
}]);
