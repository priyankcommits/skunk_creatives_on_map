var mymap = L.map('mapid', {
  zoomDelta: 0.25,
  zoomSnap: 0
}).setView([0,0], 2.3);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
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
      html: '<img class="marker-image" src="images/'+ item.image + '"/>' +
      '<br><span class="marker-span">'+ item.creative + '</span>' +
      '<br><span class="marker-span">Impressions:'+ item.impressions + '</span>'
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
function renderTransitioningMakers() {
  var intervalID = setInterval(function () {
    removeMarkers();
    currentMarkers = [];
    generateCurrentMarkerData(x);
    if (++x === 24) {
      window.clearInterval(intervalID);
    }
  }, 1000);
}

renderTransitioningMakers();
