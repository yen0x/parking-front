var app = angular.module('parking.controllers');

app.controller('HomeCtrl', ['$scope', '$state', function ($scope, $state) {
  $scope.datepicker = {
    start: false,
    end: false
  }
  $scope.search = {
    address: '',
    start: new Date(),
    end: new Date() 
  };

  var formatDate = function(date) {
    if (!date) {
      return '';
    }

    var month = +date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }

    var day = +date.getDate();
    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  $scope.openDatePicker = function(id, $event) {
    $scope.datepicker[id] = !$scope.datepicker[id];
  };

  $scope.onParkingSearchSubmit = function () {
      if ($scope.parkingSearchForm.$valid) {
          $state.go( 
              'search',
              {
                query: $scope.search.address, // FIXME(remy): do we need to escape the address ?
                start: formatDate($scope.search.start),
                end: formatDate($scope.search.end)
              },
              { location: true }
           ); 
      }
  };
}]);
