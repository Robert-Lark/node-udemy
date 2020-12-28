//THIS IS HOW TO MAKE A REQUEST WITHOUT USING ANY MODULES

const http = require("http");

const url =
  "http://api.weatherstack.com/current?access_key=242d7ff182a597eb19d53e4394bc459f&query=45,-75&units=f";

const request = http.request(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log("an error", error);
});

request.end();
