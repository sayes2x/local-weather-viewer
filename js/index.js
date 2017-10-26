var tempC = 0, tempF = 0, units = "C";

function getLocationUrl() {
  var locationUrl = "";
    if (navigator.geolocation){
      locationUrl = navigator.geolocation.getCurrentPosition(function(position) {
        getWeather(position.coords.longitude, position.coords.latitude);
    });
  } else {
    document.getElementById('location').innerHTML = "Location is not avaliable in this browser."
  }
}

function getWeather(lon, lat) {
  var Url = "https://fcc-weather-api.glitch.me/api/current?lon=" + lon + "&lat=" + lat;
  var localWeather = new XMLHttpRequest();
  localWeather.open("GET", Url, true);
  localWeather.send();
  localWeather.onload=function(){ 
    var json=JSON.parse(localWeather.responseText);
    document.getElementById('location').innerHTML = json.name + ", " + json.sys.country;
    convertTemp(json.main.temp);
    changeUnits();
    document.getElementById('weather').innerHTML = json.weather[0].main;
    document.getElementById('icon').innerHTML = '<img src="' + json.weather[0].icon + '" alt="Weather Icon">';
  };
}

function convertTemp (temp) {
  tempC = Math.round(temp * 10) / 10;
  tempF = Math.round((temp * 9 / 5 + 32) * 10) / 10;
}

function changeUnits() {
  if (units == "C") {
    document.getElementById('temprature').innerHTML = tempF + "<sup>o</sup> F";
    units = "F";
  } else {
    document.getElementById('temprature').innerHTML = tempC + "<sup>o</sup> C";
    units = "C";
  }
}

getLocationUrl();