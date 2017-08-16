const express = require("express");
const request = require("request");
const router = express.Router();

const url = "https://www.moviepass.com/theaters/zip/";

getTheaters = (req, res) => {
  request(url + req.params.zip, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
};

router.get("/theaters/:zip", getTheaters);
router.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = router;
