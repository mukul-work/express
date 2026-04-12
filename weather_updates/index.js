var path = require("path");
var express = require("express");
var axios = require("axios");

var app = express();
var WEATHER_API_KEY = "6c94c35ad4f24c5db0a130613261204";

app.use(express.static(path.resolve(__dirname, "public")));
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/weather", function (req, res, next) {
  var city = req.query.city;

  axios.get("http://api.weatherapi.com/v1/current.json", {
    params: {
      key: WEATHER_API_KEY,
      q: city
    }
  }).then(function (response) {
    res.json({
      city: city,
      temperature: response.data.current.temp_c
    });
  }).catch(function (err) {
    console.log(err.response.data);
    next();
  });
});

app.use(function (req, res) {
  res.status(404).render("404");
});

app.listen(3000);