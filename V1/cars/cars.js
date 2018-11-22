const Router = require("restify-router").Router;
const router = new Router();
const restify = require("restify");

router.use(restify.plugins.bodyParser());

//lista delle auto
router.get("/", function(req, res, next) {
  try{
    res.send(200, "List of cars: [TODO]");
  }catch(e){
    res.send(500, {error: e});
  }finally{
    console.log("[GET] /v1/cars/");
  }
 
  return next();
});

//specifiche auto
router.get("/:plate", function(req, res, next) {
  try{
    res.send(200, "Current values for car " + req.params["plate"] + ": [TODO]");
  }catch(e){
    res.send(500, {error: e});
  }finally{
    console.log("[GET] /v1/cars/plate");
  }
 
 
  return next();
});

//inserimento nuova auto
router.post("/:plate", function(req, res, next) {
  try{
    res.send(201, "Data received from plate [TODO]");
  }catch(e){
    res.send(500, )
  }finally{
    console.log("[POST] /v1/cars/plate");
  }
 
  
  return next();
});

module.exports = router;
