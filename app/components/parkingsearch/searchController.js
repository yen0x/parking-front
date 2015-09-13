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

    $scope.results = [];
    $scope.selected = -1;
    $scope.parkings = [];

    // launchSearch queries MapBox to retrieve
    // lat-lon (or bounds) to place the map
    $scope.launchSearch = function() {
        if ($scope.form.address.length == 0) {
          // TODO(remy): handle this case.
          return;
        }

        $http.get('https://api.mapbox.com/v4/geocode/mapbox.places/' +
            $scope.form.address.replace(' ', '+').replace('undefined', '').trim() +
            '.json?access_token=pk.eyJ1IjoieWVub3giLCJhIjoiODQyNmI4YjA5NjI4MjY0MTYwYzI3NDZmZWVlYzVhOWEifQ.IR7ZRxLEFo4MWi6QIWGSUQ'
            )
            .then(function(response) {
                if (response.status !== 200) {
                  // TODO(remy): deal with something else than a 200.
                }
                if (response.data.features.length === 0) {
                  // TODO(remy): deal with no results
                  alert('No result found.');
                  return;
                }

                $scope.process(response);
            },
            function(response) {
                // TODO(remy): deal with an error.
                console.log('error:');
                console.log(response);
            });
    };

    $scope.process = function(response) {
      $scope.results = [];
      $scope.selected = -1;

      for (var i = 0; i < response.data.features.length; i++) {
        var feature = response.data.features[i];
        $scope.results.push({
          title: feature.text,
          description: feature.place_name,
          relevance: feature.relevance,
          bbox: feature.bbox,
          center: feature.center
        });
      }

      if ($scope.results.length != 0) {
        $scope.selectAddress(0);
      }
    };

    $scope.selectAddress = function(selection) {
      $scope.moveMap(selection);
      $scope.searchParking(selection);
    };

    $scope.searchParking = function(selection) {
      var center = $scope.results[selection].center;

      if (!center) {
        return;
      }

      var url = '/api/parking/search/area/' + center[1] + ',' + center[0];
      $http.get(url)
          .then(function(response) {
            $scope.parkings = response.data;
          },
          function(response) {
            alert('Error while querying the backend.');
          });
    };

    $scope.moveMap = function(selection) {
      var bbox = $scope.results[selection].bbox;

      if (!bbox) {
        return;
      }

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

      $scope.selected = selection;
    };

    $scope.launchSearch();
}]);
