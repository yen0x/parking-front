var app = angular.module('parking.controllers');

app.controller('SearchCtrl', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {
    angular.extend($scope, {
        bounds: {},
        center: {
            lat: 48.50,
            lng: 2.20,
            zoom: 7
        }
    });

    $scope.form = {
      address: $stateParams.query
    };

    // launchSearch queries MapBox to retrieve
    // lat-lon (or bounds) to place the map.
    $scope.launchSearch = function() {
        if ($scope.form.address.length == 0) {
          // TODO(remy): handle this case.
          return;
        }

        $http.get("https://api.mapbox.com/v4/geocode/mapbox.places/" +
            $scope.form.address.replace(" ", "+").replace("undefined", "").trim() +
            ".json?access_token=pk.eyJ1IjoieWVub3giLCJhIjoiODQyNmI4YjA5NjI4MjY0MTYwYzI3NDZmZWVlYzVhOWEifQ.IR7ZRxLEFo4MWi6QIWGSUQ"
            )
            .then(function(response) {
                $scope.moveMap(response);
            },
            function(response) {
                // TODO(remy): deal with an error.
                console.log('error:');
                console.log(response);
            });
    }

    $scope.moveMap = function(result) {
      if (result === undefined) {
        return;
      }

      if (result.status !== 200) {
        // TODO(remy): deal with something else than a 200.
      }

      if (result.data.features.length === 0) {
        // TODO(remy): deal with no results
        alert('No result found.');
        return;
      }

      console.log(result);
      var bbox = result.data.features[0].bbox;
      var northEast = {
        lat: bbox[3],
        lng: bbox[2]
      }
      var southWest = {
        lat: bbox[1],
        lng: bbox[0]
      }

      $scope.bounds = {
        northEast: northEast,
        southWest: southWest
      }
    }

    $scope.launchSearch();
}]);
