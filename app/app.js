import * as MODEL from "./model.js";
var input = document.getElementById("gwInput");

function initListeners() {
  $("#gw").click((e) => {
    const location = $("#gwInput").val();
    if (location != "") {
      getWeather(location);
      getForecast(location);
    } else {
      alert("You must enter a valid location in the search field.");
    }
  });
}

 
function getWeather(location) {
  MODEL.getCurrentWeather(location);
  $("#gwInput").val("");
}

function getForecast(location) {
  MODEL.getCurrentForecast(location);
  $("#gwInput").val("");
}

 
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("gw").click();
  }
});

$(document).ready(function () {
  initListeners();
  console.log("ready!")
 
});
