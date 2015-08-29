var app = angular.module('parking', ['parking.controllers', 'ui.router', 'ui.bootstrap']);
angular.module('parking.controllers', [])

app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/app/components/home/homeView.html',
                controller: 'HomeCtrl'
            });
    }]);
