const express = require("express");
const request = require("request");
const router = express.Router();

const url = "https://www.moviepass.com/theaters/zip/";

getTheaters = (req, res) => {
  request(url + req.params.zip, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(body);
    } else if (!error && response.statusCode == 503) {
      res.status(503);
      console.error('Moviepass returned a 503 for zipcode ' + req.params.zip);
      res.send('Service currently unavailable');
    } else {
      res.status(500);
      console.error(error)
      res.send('Something went wrong :(');
    };
  })
};

getNews = (req, res) => {
  const options = {
    url: "https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=moviepass&mkt=en-us",
    headers: {
      'Ocp-Apim-Subscription-Key': '41f3f2b9f74d4e76b7af19fcaaa63724'
    }
  };
  request(options, (err, response, body) => {
    res.send(body);
  });
}

router.get("/theaters/:zip", getTheaters);
router.get("/news", getNews);
router.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = router;