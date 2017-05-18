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
var skycons = new Skycons({"color": "blue"});

//Geolocation Options
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// AJAX request for weather info
function getWeather() {
  var data;
  if (!!lat || !!lon) {
    data = {lat: lat, lon: lon}
  }  
  $.ajax({
    url: `https://stark-dawn-64113.herokuapp.com/weather/index`,
    type: 'GET',
    cache: false,
    data: data,
  }).done(function(server_data){
    //If request is succesful data is assigned to values below.
    console.log("success" + server_data);
    weather = server_data;
    tempF = (server_data["currently"]["temperature"]).toFixed(1);
    windS = server_data["currently"]["windSpeed"];
    humidT = server_data["currently"]["humidity"] * 100;
    icon = server_data["currently"]["icon"];
    summary = server_data["currently"]["summary"];
    console.log(icon);
    tempC = parseFloat(((tempF - 32)/1.8).toFixed(1));
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
  getWeather();
};

//Once a AJAX request is succesful updates data on page
function showWeather() {
  document.getElementById("summary").innerHTML = summary;
  document.getElementById("temp").innerHTML = `Temperature ${tempF} F`;
  document.getElementById("tempConvert").classList.add("fahrenheit");
  document.getElementById("humidT").innerHTML = `Humidity: ${humidT.toFixed(0)}%`
  document.getElementById("windS").innerHTML = `Wind Speed: ${windS} mi/h`
  skycons.set("icon", icon)
  skycons.play();
  document.getElementById("tempConvert").classList.remove("hidden")
}
//This function will convert the temp on the webpage
function tempConvert() {
  console.log("success")
  if (this.classList.contains("fahrenheit")) {
    document.getElementById("temp").innerHTML = `Tempurature ${tempC} C`;
    this.classList.remove("fahrenheit");
    this.classList.add("celsius");
  }
  else if (this.classList.contains("celsius")) {
    document.getElementById("temp").innerHTML = `Tempurature ${tempF} F`;
    this.classList.remove("celsius");
    this.classList.add("fahrenheit");
  } else {
    this.innerHTML = `There was an issue with the conversion`;
  }
}

$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(success, error, options);
  document.getElementById("tempConvert").addEventListener("click", tempConvert);
})
