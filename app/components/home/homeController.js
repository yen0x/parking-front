var app = angular.module('parking.controllers');

app.controller('HomeCtrl', ['$scope', '$state', function ($scope, $state) {
  $scope.search = {
      address: ''
  };

  $scope.onParkingSearchSubmit = function () {
      if ($scope.parkingSearchForm.$valid) {
          $state.go( 
              'search',
              { query: $scope.search.address }, // FIXME(remy): do we need to escape the address ?
              { location: true }
           ); 
      }
  };
}]);
