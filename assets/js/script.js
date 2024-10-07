let chathams_blue = '#1A4B84';
mapboxgl.accessToken = 'pk.eyJ1IjoicGFyaXNyaSIsImEiOiJja2ppNXpmaHUxNmIwMnpsbzd5YzczM2Q1In0.8VJaqwqZ_zh8qyeAuqWQgw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [80.18536880746353, 16.501575031841256],
    zoom: 13
});

// Add the control to the map.
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Search ...'

});
// Add the control to the map.
var geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});

// Add the control to the map.
map.addControl(geolocate);
map.on("load", function() {
    geolocate.trigger();
});
map.on("mousemove", function(e) {
    document.getElementById("info").innerHTML =
        // e.point is the x, y coordinates of the mousemove event relative
        "<p>Geographical information</p>" +
        // "<br />" +
        // e.lngLat is the longitude, latitude geographical position of the event
        JSON.stringify(e.lngLat.wrap());
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
// eslint-disable-next-line no-undef
map.addControl(new mapboxgl.FullscreenControl());


var marker = new mapboxgl.Marker({
        draggable: true
    })
    .setLngLat([0, 0])
    .addTo(map);

function onDragEnd() {
    var lngLat = marker.getLngLat();
    coordinates.style.display = "block";
    coordinates.innerHTML =
        "Longitude: " + lngLat.lng + "<br />Latitude: " + lngLat.lat;
}
marker.on("dragend", onDragEnd);
var layerList = document.getElementById("menu");
var inputs = layerList.getElementsByTagName("input");

function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle("mapbox://styles/mapbox/" + layerId);
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}


document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
function setTheme(theme) {
    document.documentElement.style.setProperty('--primary-color', theme);
    localStorage.setItem('map-theme', theme);
}
setTheme(localStorage.getItem('map-theme') || chathams_blue);
