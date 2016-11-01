var map;
var marker;
var shape_coordinates = [];
var i = 0;

function init(data) {

    $.each(data, function(index, value) {

        var x = new google.maps.LatLng({
            lat: value.shape_pt_lat,
            lng: value.shape_pt_lon
        });

        shape_coordinates.push(x);
    });

    initMap();
    update();
}

function update() {

    setTimeout(function() {
        $.ajax({
            url: 'http://localhost:8080/api/where/vehicles-for-agency/COTA.json?key=TEST',
            dataType: 'JSONP',
            jsonpCallback: 'callback',
            type: 'GET',
            success: function(o) {

                console.log(o);
                var pos = new google.maps.LatLng({
                    lat: o.data.list[0].tripStatus.position.lat,
                    lng: o.data.list[0].tripStatus.position.lon
                });

                move(map, marker, pos);
                update();
            }
        });
    }, 3000);
}

function getShapes() {

    $.get("/gtfs/shapes", function(data) {
        init(data);
    });
}

function move(map, marker, position) {

    marker.setPosition(position);
    //map.panTo(new google.maps.LatLng(0, 0));
}

function simulateBus() {

    var l = shape_coordinates.length;
    setTimeout(function() {
        move(map, marker, shape_coordinates[i]);
        i++;

        if (i < l) {
            simulateBus();
        }

    }, 1000);
}

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: shape_coordinates[100],
        zoom: 12
    });

    var path = new google.maps.Polyline({
        path: shape_coordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    var image = '/images/bus.png';
    marker = new google.maps.Marker({
        position: shape_coordinates[0],
        map: map,
        icon: image
    });

    //path.setMap(map);
    marker.setMap(map);

}

getShapes();