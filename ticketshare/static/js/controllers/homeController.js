function homeController($rootScope, $scope, $http, UserFactory) {

    $scope.gotTicket = function() {
        var watchID = navigator.geolocation.watchPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude);
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        var data = {
            "ticket" : true,
            "long" : longitude,
            "lat" : latitude
        };
        UserFactory.updateUser( data, function(response) {
           $location.path('/')
        });
      });
    }
}