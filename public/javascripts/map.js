var map;
var marker;
var shape_coordinates = [];
var i = 0;
var currentVehicleId;
var vehicleIDs = [];
var init = true;

function updateActiveVehicles(time) {

    // update active vehicle list every 10 minutes
    // we need to specify dataType and jsonpCallback due to cross site origin limitations
    setTimeout(function() {
        $.ajax({
            url: 'http://localhost:8080/api/where/vehicles-for-agency/COTA.json?key=TEST',
            dataType: 'JSONP',
            jsonpCallback: 'cb',
            type: 'GET',
            success: function(json) {

                // on success, empty list and append new active vehicle list 

                var activeVehicleList = json.data.list;

                $("#activeVehicles").empty();
                $.each(activeVehicleList, function(i, value) {

                    var option = $('<option></option>').attr("value", value.vehicleId).text('{ vehicleId: ' + value.vehicleId + ' }');
                    $("#activeVehicles").append(option);
                });

                updateActiveVehicles(600000);
            }
        });
    }, time);
}


function updateVehiclePosition(time) {

    // update selected vehicle position every 4 seconds
    // we need to specify dataType and jsonpCallback due to cross site origin limitations
    setTimeout(function() {
        $.ajax({
            url: 'http://localhost:8080/api/where/vehicles-for-agency/COTA.json?key=TEST',
            dataType: 'JSONP',
            jsonpCallback: 'callback',
            type: 'GET',
            success: function(json) {

                // on success, check if active vehicle, and move marker accordingly 

                var activeVehicleId = $("#activeVehicles").val();
                console.log('activeVehicleId', activeVehicleId);
                // only if we have a valid select value
                if (!activeVehicleId == "") {

                    $.each(json.data.list, function(index, value) {

                        if (value.vehicleId == activeVehicleId) {

                            // logging
                            console.log('activeVehicle', value);
                            console.log('position',
                                value.tripStatus.position.lat + ', ' +
                                value.tripStatus.position.lon
                            );
                            console.log('');
                            // ---

                            var pos = new google.maps.LatLng({
                                lat: value.tripStatus.position.lat,
                                lng: value.tripStatus.position.lon
                            });

                            marker.setTitle(activeVehicleId);
                            move(map, marker, pos);

                            // get out of loop immediately - we found our vehicle
                            return false;
                        }
                    });
                }

                updateVehiclePosition(4000);
            }
        });
    }, time);
}

function getShapes() {

    // example call to server to retrieve static gtfs data
    $.get("/gtfs/shapes", function(data) {
        console.log(data);
    });
}

function move(map, marker, position) {

    marker.setPosition(position);
    //map.panTo(new google.maps.LatLng(0, 0));
}

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng({
            lat: 40.007991,
            lng: -82.963090
        }),
        zoom: 11
    });

    // use this to set a path for a bus route
    var path = new google.maps.Polyline({
        path: shape_coordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    // bus marker
    var image = '/images/bus_64.png';
    marker = new google.maps.Marker({
        position: shape_coordinates[0],
        map: map,
        icon: image
    });

    //path.setMap(map);
    marker.setMap(map);

}

$(document).ready(function() {

    initMap();

    updateActiveVehicles(0);
    updateVehiclePosition(0);

});