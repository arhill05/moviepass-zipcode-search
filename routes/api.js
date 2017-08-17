const express = require("express");
const request = require("request");
const router = express.Router();
const redis = require('redis');
const client = redis.createClient({
    retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 3) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
});

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
