// from data.js

var tableData = data2;

function tableBuild() {
  var table = d3.select("tbody");
  data2.forEach((data2) => {
    var row = table.append("tr");
    Object.entries(data2).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
  });
};

tableBuild(tableData);

var button = d3.select("#filter-btn");
button.on("click", filter);

function filter() {
    d3.event.preventDefault();
    var filteredData = tableData;

    var inputData = d3.select("#year_installed");
    var inputArtist = d3.select("#artist");
  
    var inputDataValue = inputData.property("value");
    var inputArtistValue = inputArtist.property("value");


    if(inputDataValue !=""){
      filteredData = tableData.filter(j => j.year_installed === inputDataValue);
    }
    if(inputArtistValue !=""){
      filteredData = tableData.filter(j => j.artist === inputArtistValue);
    }

    var table = d3.select("tbody");
    table.html("");

    filteredData.forEach((data2) => {
        var row = table.append("tr");  
        Object.entries(data2).forEach(([key, value]) => {
            var cell1 = row.append("td");
            cell1.text(value);
        });
      });   
    }   

var selected = d3.select("#selectedField").on("change", getData);

function getData() {
  d3.event.preventDefault();
  var intputType = d3.select("#selectedField");
        // Assign the value of the dropdown menu option to a variable
  var inputTypeValue = intputType.property("value");
     
  if(inputTypeValue !=""){
      filteredData = tableData.filter(j => j.type === inputTypeValue);
    }
    if(inputTypeValue !=""){
      filteredData = tableData.filter(j => j.type === inputTypeValue);
    }
    var table = d3.select("tbody");
    table.html("");
    
    filteredData.forEach((data2) => {
        var row = table.append("tr");  
        Object.entries(data2).forEach(([key, value]) => {
            var cell1 = row.append("td");
            cell1.text(value);
        });
      });   
};
