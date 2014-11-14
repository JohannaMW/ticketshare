var ticket_ang = angular.module('ticket_ang', ['ngRoute']);

ticket_ang.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: '/static/js/views/home.html', controller: homeController }).
        when('/', {templateUrl: '/static/js/views/map.html', controller: mapController }).
            otherwise({redirectTo: '/'});

}]);