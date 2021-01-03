const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//Defined paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//this brings in external html css and js files
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Rob Lark",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rob Lark",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "This is the help text",
    title: "This is the Help Page",
    name: "Rob Lark",
  });
});
// the below endpoint uses dynamic data retrieved from the request object (req.query.address)
// so the url hit to not trigger an error message is http://localhost:3000/weather?address=philadelphia
app.get("/weather", (req, res) => {
  if (!req.query.address) {
   return res.send({
      error: 'You must provide a location'
    })
      }
      geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
          return res.send({error});
        }

        forecast(latitude, longtitude, location, (error, forecastData) => {
          if (error) {
            return res.send({error});
          }
          res.send({
            forecast: forecastData,
            location, 
            address: req.query.address
          })
        });
      });
});

app.get("/products", (req, res) => {
  if (!req.query.address) {
res.send({
  error: 'You must provide a search term'
})
  }
  req.query
res.send({
  products: []
})
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMsg: "Sorry the help page you are searching for does not exist",
    name: "Rob Lark",
    title: "404",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMsg: "Sorry the page you are searching for does not exist",
    name: "Rob Lark",
    title: "404",
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

