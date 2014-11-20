$(document).ready(function() {
    var username = "hello";
    var longitude = 10;
    var latitude = 110;

    $.ajax({
        url: '/get_user',
        type: "GET",
        success: function(data) {
            username = data[0].fields.username;
            console.log(username);
        }
    });

    $('button#ticket').on('click', function() {
        navigator.geolocation.watchPosition(showPosition);
        console.log('clicked');
        $(this).attr('class', 'btn btn-success').value = "Ticket!";
    });

    var firebaseRef = new Firebase("https://johannas.firebaseio.com/");
    var geoFire = new GeoFire(firebaseRef);
    var ref = geoFire.ref();  // ref === firebaseRef

    var positionData = {};
    var showPosition = function (position) {
        positionData = {
            lat: position.coords.latitude,
            long: position.coords.longitude
        };
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        console.log(positionData);
        positionData = JSON.stringify(positionData);
            $.ajax({
                url: '/set_position/',
                type: "POST",
                data: positionData,
                dataType: 'json',
                    success: function(data) {
                        console.log(data);
                    }
            });
        console.log(username);
        console.log(longitude);
        console.log(latitude);
        console.log(geoFire);

     geoFire.set(username, [latitude, longitude]).then(function () {
         console.log("Provided key has been added to GeoFire");
     }, function (error) {
         console.log("Error: " + error);
     });

        };

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition)
    } else {
        x.innerHTML = "Geolocation is not supported by this browser"
    }

    });
