const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
router.use(bodyparser.json());

router.get("/v1/cars/", function(req, res, next) {
    res.send("List of cars: [TODO]");
    return next();
  });
  
  router.get("/v1/cars/:plate", function(req, res, next) {
    res.send("Current values for car " + req.params["plate"] + ": [TODO]");
    return next();
  });
  
  router.post("/v1/cars/:plate", function(req, res, next) {
    res.send("Data received from plate [TODO]");
    // uncomment to see posted data
    // console.log(req.body);
    return next();
  });
  
  module.exports = router;