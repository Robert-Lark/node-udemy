const request = require("request");

// const weatherUrl =
//   "http://api.weatherstack.com/current?access_key=148addfca509cb15264191299e3e84b9&query=37.8267,-122.4233";

// request({ url: weatherUrl, json: true }, (error, response) => {
//   if (error) {
//     console.log("unable to connect to weather service");
//   } else if (response.body.error) {
//     console.log("Unable to find location");
//   } else {
//     console.log(
//       `In ${response.body.location.name}, ${response.body.location.region}, it is currently: ${response.body.current.temperature} degrees celcius and the chance of precipitation is ${response.body.current.precip}percent`
//     );
//   }
// });

const geoUrl =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/erererer.json?access_token=pk.eyJ1Ijoicm9iZXJ0bGFyazE0IiwiYSI6ImNraXVyeDNwajA5eGEycXJ3d2Nwc25wamMifQ.HiNqasp3V5qdrWiYzNT5zA";

request({ url: geoUrl, json: true }, (error, response) => {
  if (error) {
    console.log("unable to connect to location services");
  } else if (response.body.features.length === 0) {
    console.log("Unable to find location. Try another search");
  } else {
    const lat = response.body.features[0].center[1];
    const long = response.body.features[0].center[0];
    console.log(lat, long);
  }
});
