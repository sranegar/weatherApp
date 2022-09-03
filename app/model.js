var key = "ee6dff8161ac471bb4d202345222908";
var baseURL = "https://api.weatherapi.com/v1/";

var location = "";

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const fullDate = `${year}-${month}-${day}`;
  return fullDate;
}

function getCurrentForecast(location) {
  const currentDate = getCurrentDate();
  //Look through the data

  $.getJSON(
    `${baseURL}forecast.json?key=${key}&q=${location}&days=5&aqi=no&alerts=no`,
    (data) => {
      //Clear old data
      $("#app").empty();

      const fiveDayForecast = data.forecast.forecastday;
      for (let i = 0; i < fiveDayForecast.length; i++) {
        const day = fiveDayForecast[i];
        const date = day.date;
        const dateLbl = moment(date).format("M/DD");
        const stringDate = moment(date).day();

        const dayOfWeek = moment().weekday(stringDate);

        const weekDay = moment(dayOfWeek._d).format("dddd");

        $("#app").append(
          `<div class="forecast-card">
           <div class="date-label"><p class="week-day">${weekDay}</p> <p class="date">${dateLbl}</p></div>
          
            <div class="content-wrapper">
           
            <img src="${day.day.condition.icon}" alt="Weather Icon" />

          <div class="condition-wrapper">
          <p class="condition-text">${day.day.condition.text}</p>
         
          <div class="hi-low"><p>${day.day.maxtemp_f}&#176;F</p><p class="slash">/</p><p>${day.day.mintemp_f}&#176;F</p></div>
          </div>

            
             <div class="chance-rain">
             <i class="fa-solid fa-droplet"></i> <p class="rain">${day.day.daily_chance_of_rain}%</p>
            </div>
            </div>
            </div>
            
           `
        );
      }
    }
  ).fail(function (e) {
    console.log("error ", e);
    alert("Sorry, data could not be loaded at this time.");
  });
}

function getCurrentWeather(location) {
  $.get(
    `${baseURL}current.json?key=${key}&q=${location}&days=5&aqi=no&alerts=no`,
    (data) => {
      //clear old data
      $("#current").empty();
      console.log(data);
      const location = data.location.name;
      const region = data.location.region;
      const time = data.location.localtime;
      const cur = data.current;
      const condition = data.current.condition;
      const curTemp = data.current.temp_f;

      function convert(val) {
        return moment(val).format("h:mm A");
      }
      function formatDate(val) {
        return moment(val).format("MMM d, YYYY");
      }

      const stringDate = moment(time).day();

      const dayOfWeek = moment().weekday(stringDate);

      const weekDay = moment(dayOfWeek._d).format("dddd");

      $("#current").append(
        `<div id="current-card" class="current-card">   
        <div class="header">Current <p class="tz-id">${
          data.location.tz_id
        }</p></div>
        <div class="cur-wrapper">
        <div class="left-content">
        <div class="location">
        <p>${location}, ${region} </p>
        <p class="time">${convert(time)} | ${weekDay} ${formatDate(time)}</p>
        <p class='cur-temp'>${curTemp}&#176;F</p>
         <img src="${condition.icon}" alt="Weather Icon" />
        <p class="current-weather-text">${condition.text}</p>
        </div>
        <div class="temp-wrapper">
        </div>
        </div>
        <div class="cur-details">
        <div class="column1">
        <div class="row">
          <p>Wind</p>
            <p>${cur.wind_mph}mph</p>
        </div>
        <div class="row">
          <p>Windchill</p>
            <p>${cur.wind_degree}&#176;</p>
        </div>
          <div class="row">
          <p>Pressure</p>
            <p>${cur.pressure_in}"</p>
        </div>
         <div class="row">
          <p>Humidity</p>
            <p>${cur.humidity}%</p>
        </div>
        </div>
               <div class="divider"></div> 
            <div class="column2">
                <div class="row">
          <p>Daily Rain</p>
            <p>${cur.precip_in}"</p>
        </div>
        <div class="row">
              <p>Feels Like</p>
            <p>${cur.feelslike_f}&#176;</p>
        </div>
          <div class="row">
        <p>Gust</p>
            <p>${cur.gust_mph}mph</p>
        </div>
         <div class="row">
           <p>UV</p>
            <p>${cur.uv}</p>
        </div>
             </div>
        </div>
        </div>
        </div>
          `
      );
    }
  ).fail(function (e) {
    alert("Sorry, can't get weather.");
  });
}

export { getCurrentWeather, getCurrentForecast };
