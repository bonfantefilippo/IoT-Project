const Router = require('restify-router').Router; 
const router = new Router();
const restify = require('restify');
const influx = require('./../../../../db/influx/controllers/db.controller');

router.use(restify.plugins.bodyParser());


//lista di sensori presenti nell'auto VA SU CARS
router.get("/", (req, res, next) => {
  try {
    res.send(200, {hello: "world"});
  } catch (e) {
    res.send(500, {error: e});
  } finally {
    console.log("[GET] /v1/sensors/");
  }
  return next();
});

//dati sensori
router.get("/data", (req, res, next) => {
  try {
    //query
    res.send(200, [{value: "sensore1"},  {value: "sensore2"}]);
  } catch (e) {
    res.sendStatus(500).send(e);
  } finally {
    console.log("[GET] /v1/sensors/data");
  }
  return next();
});

//dati singolo sensore
router.get("/data/:id", (req, res, next) => {
  try {
   
    res.send(200, {value: "singolo sensore"});
  } catch (e) {
    res.sendStatus(500).send(e);
  } finally {
    console.log("[GET] /v1/sensors/data/id");
  }
  return next();
});


//scrittura misure
router.post("/write", (req, res, next) => {
  try {
    res.send(201, {value: "POSTED"}); 
  } catch (e) {
    res.sendStatus(500).send(e);
  } finally {
    console.log("[POST] /v1/sensors/write");
    console.dir(`${req.body}`);
  }
  return next();
});

//scrittura singola misura
router.post("/write/:id", (req, res, next) => {
  try {
      res.send(201, {value: "sono la post, puoi scrivere"}); 
  } catch (e) {
    res.sendStatus(500).send(e);
  } finally {
    console.log(`[POST] /v1/sensors/write/id}`);
  }
  return next();
});

module.exports = router;

