var ticket_ang = angular.module('ticket_ang', ['ngRoute']);

ticket_ang.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: '/static/js/views/home.html', controller: homeController }).
        when('/journey/:id', {templateUrl: '/static/js/views/journey.html', controller: journeyController }).
        when('/user/:id', {templateUrl: '/static/js/views/user.html', controller: userController }).
        otherwise({redirectTo: '/'});
}]);
