// histogram chart
var dataPath = 'https://raw.githubusercontent.com/bevansr/project_2-group/Rice/Rice/ChicagoLandmarks2.csv';

// var muralText =  d3.selectAll(".legendtext").text();
// console.log(muralText);


d3.csv(dataPath, function (data) {
  console.log("csv", data);
  var murals = data.filter(building => building.type === "Mural");
  var landmarks = data.filter(building => building.type === "Landmark");
  console.log(landmarks.length);
  console.log(murals.length);
  var muralZips = murals.map(mural => mural.zip_code);
  var landmarkZips = landmarks.map(landmark => landmark.zip_code);
  var muralInstall = murals.map(mural => mural.install_date);
  var landmarkInstall = landmarks.map(landmark => landmark.install_date);
  var muralZipsInt = muralZips.map(zip => parseInt(zip));
  var landmarkZipsInt = landmarkZips.map(zip => parseInt(zip));
  var muralInstallInt = muralInstall.map(year => parseInt(year));
  var landmarkInstallInt = landmarkInstall.map(year => parseInt(year));

  muralZipsInt = muralZipsInt.sort();
  muralZipsIL = muralZipsInt.map(zip => `IL${zip}`);
  landmarkZipsInt = landmarkZipsInt.sort();
  landmarkZipsIL = landmarkZipsInt.map(zip => `IL${zip}`);

  muralInstallInt = muralInstallInt.sort();
  landmarkInstallInt = landmarkInstallInt.sort();

  // muralInstallInt.forEach(year => {
  //   if (year < ) {

  //   }
  // });

  console.log("year", typeof (muralInstall[0]));
  console.log("murals", murals);
  console.log("landmarks", landmarks);
  console.log("muralz", muralZips);
  console.log("landmarz", landmarkZips);
  console.log(typeof (landmarkZips[0]))
  console.log("sorted year", muralInstallInt);
  console.log("typeofyear", typeof (muralInstallInt[0]));
  console.log("typeofyear", muralInstallInt);
  console.log("sorted year", landmarkInstallInt);

  var data1 = [
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

  var layout1 = {
    barmode: "stack",
    autosize: true,
    title: "Landmarks/Murals vs. Zipcode",
    xaxis: {
      title: "Zipcode", tickangle: -45,
      yaxis: { title: "Count" },
    }
  };

  Plotly.newPlot('zipcode', data1, layout1);



  // plot the landmarks/murals vs. year installed
  var data2 = [
    {
      histfunc: "count",
      x: landmarkInstallInt,
      y: 1,
      type: "histogram",
      name: "Landmarks",
      xbins: {
        end: 1960, 
        size: 5, 
        start: 1800
      }
    },
    {
      histfunc: "count",
      x: muralInstallInt,
      y: 1,
      type: "histogram",
      name: "Murals",
      xbins: {
        end: 2020, 
        size: 5, 
        start: 1960
      }
    }
  ];

  var layout2 = {
    autosize: true,
    title: "Landmarks/Murals vs. Year Installed",
    xaxis: {
      title: "Year Installed", tickangle: -45,
      yaxis: { title: "Count" },
      range: [1780, 2020]
    }
  };

  Plotly.newPlot('year_installed', data2, layout2);



});




