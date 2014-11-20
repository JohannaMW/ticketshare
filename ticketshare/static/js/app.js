var ticket_ang = angular.module('ticket_ang', ['ngRoute', 'ngCookies', 'ui.bootstrap']);

ticket_ang.run(function ($http, $cookies) {
    console.log(csrftoken);
    $http.defaults.headers.post['X-CSRFToken'] = $cookies['csrftoken'];
    $http.defaults.headers.put['X-CSRFToken'] = $cookies['csrftoken'];
    $http.defaults.headers.common['X-CSRFToken'] = $cookies['csrftoken'];
});

ticket_ang.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: '/static/js/views/home.html', controller: homeController }).
        when('/journey/:id', {templateUrl: '/static/js/views/journey.html', controller: journeyController }).
        when('/user/:id', {templateUrl: '/static/js/views/user.html', controller: userController }).
        otherwise({redirectTo: '/'});
}]);
