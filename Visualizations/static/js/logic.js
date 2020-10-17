//Initialize all of the LayerGroups we'll be using
var markers = L.markerClusterGroup();
var landmarks = new L.LayerGroup();
var neighborhoods = new L.LayerGroup();

// custom marker icons
var landmarkIcon = L.icon({
  iconUrl: './static/images/icon_landmark.png',
  iconSize : [50,50],
});
var muralIcon = L.icon({
    iconUrl : './static/images/icon_mural.png',
    iconSize : [50,50],
});
var bearsIcon = L.icon({
  iconUrl: 'https://soldierfield.net/sites/default/files/styles/upcomming_e/public/2020-05/Chicago%20Bears%20Logo%20Square_5.jpg?itok=QvPxYn2Z',
  iconSize : [50,50],
});


// Adding tile layer to the map
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

 // Define a baseMaps object to hold our base layers
var baseMaps = {
  "Street Map" : streetmap
};

// Create overlay object to hold our overlay layer
var overlayMaps = {
  "Landmarks" : landmarks,
  "Neighborhoods" : neighborhoods
};

// Creating map object
var myMap = L.map("map", {
  center: [41.8523, -87.6323],
  zoom: 11,
  Layers: [
  streetmap,
  landmarks,
  neighborhoods
  ]
});


// Add streetmap layer
streetmap.addTo(myMap);

// Assemble API query URL
var file = "./static/data/ChicagoLandmarks2.csv";

// Grab the data with d3
d3.csv(file, function(landmarkData) {
  console.log(landmarkData);

  var chicagoLandmarks = landmarkData.filter(i => i.type === "Landmark");
  var chicagoMurals = landmarkData.filter(i => i.type === "Mural");
  console.log(chicagoLandmarks);
  console.log(chicagoMurals);

  var markers = L.markerClusterGroup();

  addMarkers(chicagoLandmarks, landmarks, landmarkIcon);
  addMarkers(chicagoMurals, landmarks, muralIcon);

  function addMarkers(data, layer, icon) {
  // Loop through Landmark data and add to landmarks layer
  for (var i = 0; i < data.length; i++) {

    // Set the data location property to a variable
    var landmarkLatitude = data[i].latitude;
    var landmarkLongitude = data[i].longitude;

    // Check for location property

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([landmarkLatitude, landmarkLongitude],{icon: icon})
        .bindPopup(`<h3>Name: ${data[i].name}<br>Type: ${data[i].type}<br>Address: ${data[i].address}<br>Date Created: ${data[i].install_date}</h3>`)).addTo(layer);


  }
  // Add our marker cluster layer to the map
  layer.addTo(myMap);
}
});

// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(){
//Store available css classes
var colors = ["red", "blue", "yellow", "navy", "orange", "green", "purple"];
//Give a random number from 0 to 6
var randomNumber = Math.floor(Math.random()*7);
return colors[randomNumber];
}


d3.json("static/data/Boundaries-Neighborhoods.geojson", function(data){

 L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindTooltip(`<h3>${feature.properties.pri_neigh}</h3>`);
    }
  }).addTo(neighborhoods);

  neighborhoods.addTo(myMap);
});

// Create layer control
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

var legend = L.control({position: 'bottomright'});

  legend.onAdd = function () {

    var div = L.DomUtil.create("div", "info legend");
        
    div.innerHTML = '<h3>Legend</h3><br><img src="./static/images/icon_mural.png"><i>Murals</i><br><img src="./static/images/icon_landmark.png"><i>Landmarks</i>'
   
    return div;

  }
legend.addTo(myMap);

//markers.addLayer(L.marker([41.86304, -87.61632],{icon: bearsIcon})
//        .bindPopup('<h3>Name: Soldier Field</h3>')).addTo(landmarks);
