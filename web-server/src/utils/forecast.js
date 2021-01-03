const {response} = require("express");
const request = require("request");

const forecast = (lat, long, location, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=242d7ff182a597eb19d53e4394bc459f&query=" +
    long +
    "," +
    lat;
  request({url, json: true}, (error, {body}) => {
    if (error) {
      response.send("unable to connect to weather service");
    } else if (body.error) {
      response.send("Unable to find location");
    } else {
      callback(
        undefined,
        `In ${location}, it is currently: ${body.current.temperature} degrees celcius and the chance of precipitation is ${body.current.precip}%`
      );
    }
  });
};
module.exports = forecast;
