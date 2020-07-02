var script = document.createElement('script');
var GOOGLE_API_KEY = config.GOOGLE_KEY;
var google_maps_url_beginning = "https://maps.googleapis.com/maps/api/js?key=";
var google_maps_url_ending = "&callback=myMap";
var google_maps_full_url = google_maps_url_beginning + GOOGLE_API_KEY + google_maps_url_ending;

script.src = google_maps_full_url;
script.defer = true;
script.async = true;
document.head.appendChild(script);

function myMap(){
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(40.7, -73.9),
        zoom: 10,
        panControl: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true,
        rotateControl: true
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
}

var marker = new google.maps.Marker({
    position: myCenter,
    animation: google.maps.Animation.BOUNCE
});

marker.setMap(map);

google.maps.event.addListener(marker,'click',function() {
    map.setZoom(9);
    map.setCenter(marker.getPosition());
});

window.initMap = myMap();

