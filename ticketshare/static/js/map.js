$(document).ready(function() {
    var firebaseRef = new Firebase("https://johannas.firebaseio.com/");
    var geoFire = new GeoFire(firebaseRef);
    var radiusInKm = 0.15;
    var ref = geoFire.ref();

    function onSuccess(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log("That's for the map" + latitude + longitude);
        var geoQuery = geoFire.query({
            center: [latitude, longitude],
            radius: 0.5
        });

        var usersInQuery = {};
        var users = [];

        geoQuery.on("key_entered", function (username) {
            var userCoord = [];
            console.log("in function:" + username);
            username = username.split(":")[0];
            console.log(username);
            usersInQuery[username] = true;


            firebaseRef.child(username).once("value", function (dataSnapshot) {
                user = dataSnapshot.val();
                users.push(user);
                console.log(user);
                console.log("Users" + users);
                userLongitude = user.l[0];
                userLatitude = user.l[1];
                userCoord.push(userLongitude);
                userCoord.push(userLatitude);
                console.log(userCoord);
                usersInQuery[username] = userCoord;
                console.log(usersInQuery);
                for (var i = 0; i < users.length; i++ ) {
                    user.marker = createUserMarker(users[i]);
                    console.log(user.marker)
                }
            });
        });
        geoQuery.on("key_moved", function (username) {
            // Get the user from the list of vehicles in the query
            var userLocation = usersInQuery[username];
            console.log('Moved:' + user);
            user.marker.animatedMoveTo(userLocation);
        });

        /* Removes vehicle markers from the map when they exit the query */
        geoQuery.on("key_exited", function (username) {
            console.log("EXITED:" + username);
            delete usersInQuery[username];
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
            console.log('where am i'+ Userlatitude + ',' + Userlongitude);
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

            // Create a draggable circle centered on the map
            var circle = new google.maps.Circle({
            strokeColor: "#6D3099",
            strokeOpacity: 0.7,
            strokeWeight: 1,
            fillColor: "#B650FF",
            fillOpacity: 0.35,
            map: map,
            center: loc,
            radius: ((radiusInKm) * 200),
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

          }
       });

    }
    google.maps.event.addDomListener(window, 'load', initialize);

    function onError(error) {
        console.log(error)
    }

    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { frequency: 2000 });


/**********************/
/*  HELPER FUNCTIONS  */
/**********************/

function createUserMarker(user) {
    console.log("in marker function");
    var loc = new google.maps.LatLng(user.l[1], user.l[0]);
    console.log("marker" + loc);
    var marker = new google.maps.Marker({
       // icon: "https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small",
        position: loc,
        optimized: true,
        map: window.map
    });
    google.maps.event.addListener(marker, 'click', (function(user) {
			return function() {
				window.infowindow.setContent('Hello');
				window.infowindow.open(map, marker);
			}
		})(marker, user));
    return marker;
    console.log('Marker' + marker);
}

/* Returns true if the two inputted coordinates are approximately equivalent */
function coordinatesAreEquivalent(coord1, coord2) {
  return (Math.abs(coord1 - coord2) < 0.000001);
}

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