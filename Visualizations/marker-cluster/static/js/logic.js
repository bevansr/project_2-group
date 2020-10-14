// Initialize all of the LayerGroups we'll be using
var markers = new L.LayerGroup();
var neighborhoods = new L.LayerGroup();


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
  "Landmarks" : markers,
  "Neighborhoods" : neighborhoods
};

// Creating map object
var myMap = L.map("map", {
  center: [41.8523, -87.6323],
  zoom: 11,
  Layers: [
  streetmap,
  markers,
  neighborhoods
  ]
});

// Add streetmap layer
streetmap.addTo(myMap);

// Assemble API query URL
var url = "https://data.cityofchicago.org/resource/tdab-kixi.json";

// Grab the data with d3
d3.json(url, function(response) {
  console.log(response);
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i].location;

    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.latitude, location.longitude])
        .bindPopup(`<h3>Name: ${response[i].landmark_name}<br>Address: ${response[i].address}<br>Date Built: ${response[i].date_built}</h3>`));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);
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
      layer.bindPopup(`<h1>${feature.properties.pri_neigh}</h1>`);
    }
  }).addTo(neighborhoods);

  neighborhoods.addTo(myMap);
});

// Create layer control
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
