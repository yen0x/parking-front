var app = angular.module('parking.controllers');

app.controller('BookingListCtrl', ['$scope', '$http', 'Auth', function ($scope, $http, Auth) {
    $scope.bookings = [];

    $scope.listBookings = function () {
        $http.get('/api/booking/list')
            .then(function (response) {
                if (response.status !== 200) {
                    // TODO(jean): deal with something else than a 200.
                }
                if (response.data.length === 0) {
                    // TODO(jean): deal with no results
                    return;
                }

                $scope.bookings = response.data;
                console.log(response.data);
            },
            function (response) {
                // TODO(jean): deal with an error.
                console.log('error:');
                console.log(response);
            });
    };

    $scope.delete = function (booking) {
        $http.delete("/api/booking/" + booking.uid + "/delete")
            .then(function (response) {
                if (response.status !== 200) {
                    // TODO(jean): deal with something else than a 200.
                    return;
                }
                if (response.data.length === 0) {
                    // TODO(jean): deal with no results
                    return;
                }
                index = $scope.bookings.indexOf(booking);
                $scope.bookings.splice(index, 1);

            },
            function (response) {
                // TODO(jean): deal with an error.
                console.log('error:');
                console.log(response);
            });
    };

    $scope.listBookings();
}]);

