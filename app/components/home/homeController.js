var app = angular.module('parking.controllers');

app.controller('HomeCtrl', ['$scope', '$state', function ($scope, $state) {

    $scope.search = {
        adresse: ""
    };

    $scope.onParkingSearchSubmit = function () {
        if ($scope.parkingSearchForm.$valid) {
            $state.go('parkingsearch');
        }
    };
}]);
