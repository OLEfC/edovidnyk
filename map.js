// map.js
var L = require('leaflet');
var markersData = require('./markers');

var map = L.map('map').setView([49.8397, 24.0297], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var markers = [];
var selectedCity = null; // Keep track of the selected city

const storeChainColors = {
  "Comfy": "green",
  "Foxtrot": "red",
  "MTA":"blue",
  "Eldorado":"white"
  // Add more store chains and colors as needed
};

function createMarkers() {
  markersData.forEach(function(markerData) {
    var marker = L.marker(markerData.latlng, {
      icon: L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${storeChainColors[markerData.name] || 'gray'}.png`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      }),
      name:markerData.name
    }).addTo(map);

    marker.bindPopup(markerData.adress);
    markers.push(marker);
    
  });
}

function showMarkers() {
  markers.forEach(function(marker) {
    map.addLayer(marker);
  });
}

function hideMarkers() {
  markers.forEach(function(marker) {
    map.removeLayer(marker);
  });
}



function centerMapOnCity(cityName) {
if (selectedCity !== cityName) {
selectedCity = cityName;
var cityCoordinates = {
    
    "Львів": {"lat": 49.8397, "lng": 24.0297},
    "Київ": {"lat": 50.4501, "lng": 30.5234},
    "Дніпро": {"lat": 48.4666, "lng": 35.0500},
    "Одеса": {"lat": 46.4667, "lng": 30.7167},
    "Миколаїв": {"lat": 46.6667, "lng": 32.0500},
    "Херсон": {"lat": 46.5167, "lng": 33.1333},
    "Івано-Франківськ": {"lat": 48.8667, "lng": 24.0667},
    "Тернопіль": {"lat": 49.5500, "lng": 25.5833},
    "Харків": {"lat": 50.3167, "lng": 36.2667},


  };

var cityLat = cityCoordinates[cityName].lat;
var cityLng = cityCoordinates[cityName].lng;



map.setView([cityLat, cityLng], 12); // Set view to the city

markers.forEach(function(marker) {
  if (marker.options.city === cityName) {
    map.addLayer(marker);
  }
});
}
}


function updateMarkers() {
  var selectedStores = [];
  var storeCheckboxes = document.querySelectorAll('.checkboxesmenu input[name="storeCheckbox"]:checked');
  storeCheckboxes.forEach(function(checkbox) {
    selectedStores.push(checkbox.value);
  });

  hideMarkers();

  markers.forEach(function(marker) {
  if (selectedStores.includes(marker.options.name)) {
    map.addLayer(marker);
  }
});
}

var checkboxes = document.querySelectorAll('.checkboxesmenu input[name="storeCheckbox"]');
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', updateMarkers);
});

createMarkers();
showMarkers();
