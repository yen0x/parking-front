var app = angular.module('parking.controllers');

app.controller('ParkingListController', ['$scope', '$http', 'Auth', function ($scope, $http, Auth) {
  $scope.parkings = [];

  $scope.listParkings = function() {
      $http.get('/api/parking/list')
          .then(function(response) {
              if (response.status !== 200) {
                // TODO(remy): deal with something else than a 200.
              }
              if (response.data.length === 0) {
                // TODO(remy): deal with no results
                return;
              }

              $scope.parkings = response.data;
              console.log(response.data);
          },
          function(response) {
              // TODO(remy): deal with an error.
              console.log('error:');
              console.log(response);
          });
  };

  //$scope.listParkings();
}]);

