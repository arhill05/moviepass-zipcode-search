const express = require("express"),
  bodyParser = require("body-parser"),
  apiRoutes = require("./routes/api"),
  routes = require('./routes/index'),
  app = express(),
  router = express.Router();

const redis = require('redis');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public/js"));
app.use(express.static("public/css"));

app.use("/api", apiRoutes);
app.use("/", routes);

module.exports = app;
