// histogram chart
var dataPath = 'https://raw.githubusercontent.com/bevansr/project_2-group/Rice/Rice/ChicagoLandmarks-COMPLETE.csv'
d3.csv(dataPath, function (data) {
  console.log("csv", data);
  var murals = data.filter(building => building.type === "Mural");
  var landmarks = data.filter(building => building.type === "Landmark");
  console.log(landmarks.length);
  console.log(murals.length);
  var muralZips = murals.map(mural => mural.zip_code);
  var landmarkZips = landmarks.map(landmark => landmark.zip_code);
  var muralZipsInt = muralZips.map(zip => parseInt(zip));
  var landmarkZipsInt = landmarkZips.map(zip => parseInt(zip));
  muralZipsInt = muralZipsInt.sort();
  muralZipsIL = muralZipsInt.map(zip => `IL${zip}`);
  landmarkZipsInt = landmarkZipsInt.sort();
  landmarkZipsIL = landmarkZipsInt.map(zip => `IL${zip}`);


  console.log("murals", murals);
  console.log("landmarks", landmarks);
  console.log("muralz", muralZips);
  console.log("landmarz", landmarkZips);
  console.log(typeof (landmarkZips[0]))
  var data = [
    {
      histfunc: "count",
      x: landmarkZipsIL,
      y: 1,
      type: "histogram",
      name: "Landmarks"
    },
    {
      histfunc: "count",
      x: muralZipsIL,
      y: 1,
      type: "histogram",
      name: "Murals"
    }
];
  
var layout = {
  autosize: true,
  title: "Landmarks/Murals vs. Zipcode",
  xaxis: {title: "Zipcode", tickangle: -45,
  yaxis: {title: "Count"},
}
};


Plotly.newPlot('bar_chart', data, layout)
});




