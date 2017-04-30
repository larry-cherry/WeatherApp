var key = `be2a1a44d8af209fcb6c606934dbfe16`;

//Geolocation Options
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

//If coordinates are pulled succesfully
function success(pos) {
  var crd = pos.coords;
  var lat = Number((crd.latitude).toFixed(1));
  var lon = Number((crd.longitude).toFixed(1));
  console.log('Your current position is:');
  console.log(`Latitude : ${lat}`);
  console.log(`Longitude: ${lon}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  $.ajax({
    url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=be2a1a44d8af209fcb6c606934dbfe16`,
    type: 'GET',
    cache: false,
  }).done(function(server_data){
    console.log("success" + server_data);

    // debugger;
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log("fail" + errorThrown);
    return "There was an issue with your request please try again.";;
  });
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};



$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(success, error, options);
  console.log(key)
})
