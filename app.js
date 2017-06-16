var mymap = L.map('mapid', {
  zoomDelta: 0.25,
  zoomSnap: 0
}).setView([0,0], 2.8);
L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  maxZoom: 19,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
  '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'mapbox.streets'
}).addTo(mymap);

items = JSON.parse(data);

var markers = new Array();

function createMarker(key, item) {
  markers[key] = new L.Marker([item.lat, item.long], {
    icon: new L.DivIcon({
      className: 'marker-div',
      html:'<div class="card">'+
      '<div class="card-image">' +
      '<img class="marker-image" src="images/' + item.image + '">' +
      '</div>' +
      '</div>'
    })
  });
  markers[key].addTo(mymap);
}

function removeMarkers() {
  for(i=0;i<markers.length;i++) {
    mymap.removeLayer(markers[i]);
  }
}

var currentMarkers = new Array();

function generateCurrentMarkerData(timeParam) {
  $.each(items, function(key, item) {
    dateField = new Date(item.date);
    if (dateField.getHours() == timeParam) {
      currentMarkers.push(item);
    }
  });
  $.each(currentMarkers, function(key, item) {
    createMarker(key, item);
  });
}

var x = 0;
var timeDiv = document.getElementById("time");
function renderTransitioningMakers() {
  var intervalID = setInterval(function () {
    removeMarkers();
    generateCurrentMarkerData(x);
    currentMarkers = [];
    timeDiv.innerHTML = x+":00 - "+(parseInt(x)+1)+":00";
    if (++x === 24) {
      window.clearInterval(intervalID);
    }
  }, 2000);
}

renderTransitioningMakers();
