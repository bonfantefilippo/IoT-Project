const Router = require('restify-router').Router; 
const router = new Router();
const bodyparser = require("body-parser");
const influx = require('../../db/influx/controllers/db.controller');
router.use(bodyparser.json());

//lista di sensori presenti nell'auto VA SU CARS
router.get("/", (req, res, next) => {
  try {
    res.send(201, {hello: "world"});
    //res.send();
  } catch (e) {
    res.send(500, {error: e});
  } finally {
   // console.dir("res");
  }
  return next();
});

//dati sensori
router.get("/data", (req, res, next) => {
  try {
    //query
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500).send(e);
  } finally {
    console.dir(res);
  }
  return next();
});

//dati singolo sensore
router.get("/data/:id", (req, res, next) => {
  try {
   
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500).send(e);
  } finally {
    console.dir(res);
  }
  return next();
});


//scrittura misure
router.post("/write", (req, res, next) => {
  try {
    let measure = req.body;
    //influx.writeOnInflux("ciao", measure);
    console.log(measure);
    
  } catch (e) {
    res.sendStatus(500).send(e);
  } finally {
    console.dir(res);
  }
  return next();

});

module.exports = router;

