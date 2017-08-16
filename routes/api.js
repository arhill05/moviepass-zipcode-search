const express = require("express");
const request = require("request");
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();

const url = "https://www.moviepass.com/theaters/zip/";

getTheaters = (req, res) => {
  client.get(req.params.zip, function (err, data) {
    if (err) throw err;
    if (data != null) res.send(data);
    else {
      request(url + req.params.zip, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          client.set(req.params.zip, body);
          res.send(body);
        } else if (!error && response.statusCode == 503) {
          res.status(503);
          res.send('Service currently unavailable');
        } else {
          res.status(500);
          res.send('Something went wrong :(');
        }
      })
    };
  })
};

router.get("/theaters/:zip", getTheaters);
router.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = router;
