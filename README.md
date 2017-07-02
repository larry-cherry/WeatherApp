# WeatherApp
## [See the Live App!](https://larry-cherry.github.io/WeatherApp/)
A front-end web app that automatically shows your local weather and reacts to weather conditions 

 __**Technologies Used**__
 * JQuery: Used to make http request easier
 * Ruby on Rails: Used to process weather request and get and CORS issue.
 * Skycons: Animated icons what pair well with Dark Sky's weather API
 * Darksky: Used on the Rails backed to get the appropriate weather data for the user's location
 * Rawgit: Useful tool that allows me to import the skycons using the git repository.

 __**Challenges**__

What was unquie in this project was the need to protect my DarkSky API key, reliably getting the user's geolocation (even if it is denied), and the app be usable both from github and codepen. In my Rails app I have a IP address API that will take the user's IP address and convert it to a geolocation if the user fails to send their own. In addtion my Rails app tracks request made so that I can keep track of how often it is used and the IP address of the request.  

