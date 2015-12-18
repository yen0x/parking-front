var app = angular.module('parking.controllers');

app.controller('ParkingCalCtrl', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var currentView = "month";

    $scope.events = [];

    $scope.parking = {
        uid: $stateParams.parking
    };

    $scope.render = function(a, b, c) {
        console.log($scope.eventSources);
    }
    /* config object */
    $scope.uiConfig = {
        calendar: {
            height: 450,
            lang: "fr",
            firstDay : 1,
            editable: false,
            header: {
                left: 'month basicWeek',
                center: 'title',
                right: 'today prev,next'
            },
            eventRender: $scope.render
        }
    };

    $scope.getEvents = function () {
        $http.get("/api/booking/" + $scope.parking.uid + "/list")
            .then(function (response) {
                if (response.status !== 200) {
                    // TODO(j): deal with something else than a 200.
                }
                response.data.forEach(function (booking) {
                    var datePartsS = booking.start.split(" ");
                    var dateS = datePartsS[0].split("-");
                    var datePartsE = booking.end.split(" ");
                    var dateE = datePartsE[0].split("-");
                    var places = booking.count > 1 ? " places" : " place";
                    $scope.events.push({
                        "title": booking.count + places,
                        "start": new Date(dateS[0], dateS[1] - 1, dateS[2]),
                        "end": new Date(dateE[0], dateE[1] - 1, dateE[2]),
                        "stick": true,
                        allDay: true
                    });
                });
            }),
            function (response) {
                // TODO(j): deal with an error.
                console.log('error:');
                console.log(response);
            };
    };

    /* event sources array*/
    $scope.getEvents();
    $scope.eventSources = [$scope.events];
}]);
