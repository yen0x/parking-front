var app = angular.module('parking.controllers');

app.controller('DashboardController', ['$scope', 'Auth', function ($scope, Auth) {
  $scope.getFirstname = function() { return Auth.getFirstname(); };
}]);
