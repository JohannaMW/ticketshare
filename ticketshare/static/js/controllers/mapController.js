function mapController($scope, $http) {

    var showPosition = function (position) {
        var latitude = position.coords.latitude;
        console.log(latitude);
        var longitude = position.coords.longitude;
        console.log(longitude)
        };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        x.innerHTML = "Geolocation is not supported by this browser"
    }
}