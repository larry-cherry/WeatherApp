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
  var lat = Number((crd.latitude).toFixed(2));
  var lon = Number((crd.longitude).toFixed(2));
  console.log('Your current position is:');
  console.log(`Latitude : ${lat}`);
  console.log(`Longitude: ${lon}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  $.ajax({
    url: `https://api.darksky.net/forecast/5b30c9a8f2a1996939817d496865c2eb/${lat},${lon}`,
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

})
