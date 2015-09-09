var app = angular.module('parking.controllers');

app.controller('AddPrkgCtrl', ['$scope', '$http', function ($scope, $http) {

    var mainMarker = {
        lat: 48.50,
        lng: 2.20,
        focus: true,
        message: "Déplacez-moi à l'emplacement du parking",
        draggable: true
    };

    angular.extend($scope, {
        center: {
            lat: 48.50,
            lng: 2.20,
            zoom: 6
        },
        markers: {
            mainMarker: mainMarker
        },
        events: { // or just {} //all events
            markers: {
                enable: ['dragend']
            }
        }
    });

    $scope.parking = {
        latitude: 48.50,
        longitude: 2.20
    };

    $scope.submit = function () {
        console.log($scope.parking);
        $http.post('/api/parking/create',
            $scope.parking
        )
            .then(function (response) {
                alert('Parking ajouté.');
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                switch (response.status) {
                    default:
                        alert("Une erreur est survenue, merci d'essayer à nouveau dans quelques instants");
                }
            });
    };

    $scope.getAddress = function () {
        var query = $scope.parking.address + "+" + $scope.parking.zip + "+" + $scope.parking.city;
        $http.get("https://api.mapbox.com/v4/geocode/mapbox.places/" +
            query.replace(" ", "+").replace("undefined", "").trim() +
            ".json?access_token=pk.eyJ1IjoieWVub3giLCJhIjoiODQyNmI4YjA5NjI4MjY0MTYwYzI3NDZmZWVlYzVhOWEifQ.IR7ZRxLEFo4MWi6QIWGSUQ")
            .success(
            function (result) {
                console.log(result);
                if (result.features.length > 0) {
                    $scope.parking.latitude = result.features[0].center[1];
                    $scope.parking.longitude = result.features[0].center[0];
                    $scope.markers.mainMarker.lat = $scope.parking.latitude;
                    $scope.markers.mainMarker.lng = $scope.parking.longitude;
                } else {
                    alert("Aucun emplacement trouvé pour cette adresse.")
                }
            }
        );
    };

    $scope.$on("leafletDirectiveMarker.dragend", function (event, args) {
        $scope.parking.latitude = args.model.lat;
        $scope.parking.longitude = args.model.lng;
    });
}]);