// Following are variables used to display information
var lat;
var lon;
var weatherInfo;
var temp;
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
    console.log("success" + server_data);
    
    weather = server_data;
    temp = server_data["currently"]["temperature"]
    WindS = server_data["currently"]["windSpeed"]
    humidT = server_data["currently"]["humidity"]
    icon = server_data["currently"]["icon"]
    summary = server_data["currently"]["summary"]
    console.log(icon)
    skycons.set("icon1", Skycons[`${icon}`]);
    debugger;
    skycons.play();
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
};

$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(success, error, options);

})
