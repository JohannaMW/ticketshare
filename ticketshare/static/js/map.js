$(document).ready(function() {
    var firebaseRef = new Firebase("https://johannas.firebaseio.com/");
    var geoFire = new GeoFire(firebaseRef);
    var radiusInKm = 0.15;
    var markers = [];
    var usersInQuery = {};
    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { frequency: 500 });

    function onSuccess(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        var geoQuery = geoFire.query({
            center: [latitude, longitude],
            radius: 0.5
        });
        window.geoQuery = geoQuery;

       geoQuery.on("key_entered", function (user, location, distance) {
            console.log ("user" + user + "location" + location + "distance" + distance);
            usersInQuery[user] = [location];
            //user.marker = createUserMarker(location, user);
            console.log("Users in Query:" + usersInQuery )
            });

        geoQuery.on("key_moved", function (user, userLocation) {
            // update User Entry
            usersInQuery[user] = userLocation;
            console.log('Moved:' + user);
            positionMarker(usersInQuery);
            // user.marker.animatedMoveTo(userLocation);
        });

        /* Removes user markers from the map when they exit the query */
        geoQuery.on("key_exited", function (user) {
            console.log("EXITED:" + user);
            delete usersInQuery[user];
        });
    }

    function initialize() {
        $.ajax({
        url: '/get_user',
        type: "GET",
        success: function(data) {
            var Userlongitude = data[0].fields.long;
            var Userlatitude = data[0].fields.lat;
            var loc = new google.maps.LatLng(Userlatitude, Userlongitude);

            var mapOptions = {
              center: loc,
              zoom: 20,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);

            var infowindow = new google.maps.InfoWindow();
            window.infowindow = infowindow;
            window.map = map;

            Object.keys(usersInQuery).forEach(function (user) {
                console.log(user);
                console.log(usersInQuery[user][0]);
                    marker = new google.maps.Marker({
                    position: new google.maps.LatLng(usersInQuery[user][0][0], usersInQuery[user][0][1]),
                    map: map
                });
                var infoWindow = new google.maps.InfoWindow();

                google.maps.event.addListener(marker, 'click', function () {
                var markerContent = user;
                infoWindow.setContent(markerContent);
                infoWindow.open(map, this);
            });

            });


            // Create a draggable circle centered on the map
            var circle = new google.maps.Circle({
            strokeColor: "#6D3099",
            strokeOpacity: 0.7,
            strokeWeight: 1,
            fillColor: "#B650FF",
            fillOpacity: 0.35,
            map: map,
            center: loc,
            radius: (0.5 * 200),
            draggable: true
          });

            //Update the query's criteria every time the circle is dragged
            var updateCriteria = _.debounce(function() {
                var latLng = circle.getCenter();
                geoQuery.updateCriteria({
                  center: [latLng.lat(), latLng.lng()],
                  radius: 0.5
                });
              }, 10);
              google.maps.event.addListener(circle, "drag", updateCriteria);

                        // Resize stuff...
            google.maps.event.addDomListener(window, "resize", function() {
               var center = map.getCenter();
               google.maps.event.trigger(map, "resize");
               map.setCenter(center);
            });
          }

       });

    }
    setTimeout(initialize, 1000);
 //  google.maps.event.addDomListener(window, 'load', initialize);

    function onError(error) {
        console.log(error)
    }

/**********************/
/*  HELPER FUNCTIONS  */
/**********************/
function positionMarker(usersInQuery) {
    Object.keys(usersInQuery).forEach(function (user) {
                console.log(user);
                console.log(usersInQuery[user][0]);
                    marker = new google.maps.Marker({
                    position: new google.maps.LatLng(usersInQuery[user][0][0], usersInQuery[user][0][1]),
                    map: map
                });
                var infoWindow = new google.maps.InfoWindow();

                google.maps.event.addListener(marker, 'click', function () {
                var markerContent = user;
                infoWindow.setContent(markerContent);
                infoWindow.open(map, this);
            });

            });
}

//function createUserMarker(coord, username) {
//    var loc = new google.maps.LatLng(coord[1], coord[0]);
//    var marker = new google.maps.Marker({
//       // icon: "https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small",
//        position: loc,
//        optimized: true,
//        map: window.map
//    });
//    google.maps.event.addListener(marker, 'click', (function(user) {
//			return function() {
//				window.infowindow.setContent(username);
//				window.infowindow.open(map, marker);
//			}
//		}));
//    console.log('Marker' + marker);
//    markers.push(marker);
//    console.log("Markers List:" + markers);
//    return marker;
//}

/* Returns true if the two inputted coordinates are approximately equivalent */


/* Animates the Marker class (based on https://stackoverflow.com/a/10906464) */

google.maps.Marker.prototype.animatedMoveTo = function(newLocation) {

    var toLat = newLocation[0];
    var toLng = newLocation[1];

    var fromLat = this.getPosition().lat();
    var fromLng = this.getPosition().lng();

    if (!coordinatesAreEquivalent(fromLat, toLat) || !coordinatesAreEquivalent(fromLng, toLng)) {
        var percent = 0;
        var latDistance = toLat - fromLat;
        var lngDistance = toLng - fromLng;
        var interval = window.setInterval(function () {
            percent += 0.01;
            var curLat = fromLat + (percent * latDistance);
            var curLng = fromLng + (percent * lngDistance);
            var pos = new google.maps.LatLng(curLat, curLng);
            this.setPosition(pos);
            if (percent >= 1) {
                window.clearInterval(interval);
            }
        }.bind(this), 50);
    }
};

});