const express = require("express");
const request = require("request");
const router = express.Router();

const url = "https://www.moviepass.com/theaters/zip/";

getTheaters = (req, res, next) => {
  request(url + req.params.zip, (err, response, body) => {
    if(err) { return next(err); }
    if(response.statusCode !== 200) { return res.status(response.statusCode).send('Unable to fetch theaters from MoviePass.'); }

    res.send(body);
  });
};

router.get("/theaters/:zip", getTheaters);
router.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = router;
