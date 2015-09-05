var app = angular.module('parking.controllers');

app.controller('AddPrkgCtrl', ['$scope', '$http', function ($scope,  $http) {
    $scope.parking = {};

    $scope.submit = function() {
        console.log($scope.parking);
        $http.post('/api/parking/create',
            $scope.parking
            )
            .then(function(response) {
                alert('Praking ajouté.');
            }, function(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                switch (response.status) {
                    default:
                        alert("Une erreur est survenue, merci d'essayer à nouveau dans quelques instants");
                }
            });
    };
}]);