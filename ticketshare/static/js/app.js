var ticket = angular.module('ticket', ['ngRoute']);

ticket.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: '/static/js/views/home.html', controller: homeController }).
        when('/map', {templateUrl: '/static/js/views/map.html', controller: mapController }).
            otherwise({redirectTo: '/'});

}]);