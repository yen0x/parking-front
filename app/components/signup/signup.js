'use strict';

var app = angular.module('parking.controllers');

app.controller('SignupController', ['$scope', '$http', function ($scope, $http) {
  $scope.infos = {};
  $scope.showErrors = {};

  $scope.checkPassword = function() {
    if (!$scope.infos.password || $scope.infos.password.length < 8) {
      $scope.showErrors.password = 'Not enough characters.';
    } else {
      delete $scope.showErrors.password;
    }

  };

  $scope.checkEmail = function() {
    if (!$scope.infos.email || $scope.infos.email.length == 0 ||
        ($scope.infos.email.indexOf('@') == -1 || $scope.infos.email.indexOf('.') == -1)) {
      $scope.showErrors.email = 'Please fill a valid email.';
    } else {
      delete $scope.showErrors.email;
    }
  };

  $scope.checkFirstname = function() {
    if (!$scope.infos.firstname || $scope.infos.firstname.length == 0) {
      $scope.showErrors.firstname = 'Please fill your firstname.';
    } else {
      delete $scope.showErrors.firstname;
    }
  };

  $scope.submit = function() {
    $scope.checkPassword();
    $scope.checkEmail();
    $scope.checkFirstname();

    if (Object.keys($scope.showErrors).length > 0) {
      return;
    }

    // resetss the errors
    $scope.showErrors = {};

    $http.post('/api/user/create', {
          email: $scope.infos.email,
          firstname: $scope.infos.firstname,
          password: $scope.infos.password
        })
        .then(function(response) {
          alert('User created.');
          // TODO(remy): log and redirect to the dashboard.
        }, function(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          switch (response.status) {
            case 409:
              $scope.showErrors.email = 'Email already used.';
              break;
            default:
              $scope.showErrors.general = 'Oops! System error, please try again.';
          }
        });
  };
}]);
