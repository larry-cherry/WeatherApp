// Following are variables used to display information
var lat;
var lon;
var weatherInfo;
var tempF;
var tempC;
var windS;
var humidT;
var summary;
var icon;
var skycons = new Skycons({"color": "pink"});

//Geolocation Options
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// AJAX request for weather info
function getWeather() {  
  $.ajax({
    url: `https://stark-dawn-64113.herokuapp.com/weather/index`,
    type: 'GET',
    cache: false,
    data: {lat: lat, lon: lon},
  }).done(function(server_data){
    //If request is succesful data is assigned to values below.
    console.log("success" + server_data);
    weather = server_data;
    tempF = server_data["currently"]["temperature"]
    WindS = server_data["currently"]["windSpeed"]
    humidT = server_data["currently"]["humidity"]
    icon = server_data["currently"]["icon"]
    summary = server_data["currently"]["summary"]
    console.log(icon);
    tempC = parseFloat(((tempF - 32)/1.8).toFixed(2));
    showWeather();
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log("fail" + errorThrown);
    return "There was an issue with your request please try again.";;
  });
}

//If coordinates are pulled succesfully
function success(pos) {
  var crd = pos.coords;
  lat = Number((crd.latitude).toFixed(2));
  lon = Number((crd.longitude).toFixed(2));
  console.log('Your current position is:');
  console.log(`Latitude : ${lat}`);
  console.log(`Longitude: ${lon}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  getWeather();
};

//only runs if error occurs
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  console.log('Attempting to acquire location based on IP address')
  locationByIP();
};

//Once a AJAX request is succesful updates data on page 
function showWeather() {
  document.getElementById("summary").innerHTML = summary;
  document.getElementById("temp").innerHTML = tempF;
  skycons.set("icon", Skycons.PARTLY_CLOUDY_NIGHT);
}

function locationByIP() {
  $.ajax({
    url: `http://ip-api.com/json`,
    type: 'GET',
    cache: false,
  }).done(function(server_data){
    console.log(server_data)
    lat = server_data["lat"].toFixed(2)
    lon = server_data["lon"].toFixed(2)
    getWeather();
  })
}

$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(success, error, options);

})
