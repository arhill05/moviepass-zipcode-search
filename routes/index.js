const express = require('express');
const router = express.Router();
const path = require('path');

// return index.html at the root of the site
router.get("/", (req, res, next) => {
  res.sendFile(path.resolve(__dirname + "./../public/index.html"));
});

module.exports = router;
