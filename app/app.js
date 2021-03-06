'use strict';

/* Global declaration of the app. */
var app = angular.module(
    'parking',
    [
        'ui.router',
        'ui.bootstrap',
        'ui.calendar',
        'parking.controllers',
        'nemLogging',
        'leaflet-directive',
        'parking.services.auth'
    ]
);

angular.module('parking.controllers', []);

/* Routing */

app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state(
            'home',
            {
                url: '/',
                templateUrl: '/app/components/home/homeView.html',
                controller: 'HomeCtrl'
            }
        )
            .state(
            'addparking',
            {
                url: '/addparking',
                templateUrl: '/app/components/addparking/addparking.html',
                controller: 'AddPrkgCtrl'
            }
        )
            .state(
            'calendar',
            {
                url: '/calendar/:parking',
                templateUrl: '/app/components/parkingcalendar/parkingcalendar.html',
                controller: 'ParkingCalCtrl'
            }
        )
            .state(
            'search',
            {
                url: '/search/:start/:end/:query',
                templateUrl: '/app/components/parkingsearch/search.html',
                controller: 'SearchCtrl'
            }
        )
            .state(
            'signup',
            {
                url: '/signup',
                templateUrl: '/app/components/signup/signup.html',
                controller: 'SignupController'
            }
        )
            .state(
            'signin',
            {
                url: '/signin',
                templateUrl: '/app/components/signin/signin.html',
                controller: 'SigninController'
            }
        )
            .state(
            'dashboard',
            {
                url: '/dashboard',
                templateUrl: '/app/components/dashboard/dashboard.html',
                controller: 'DashboardController'
            }
        );
    }]);
