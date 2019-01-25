const Router = require("restify-router").Router;
const router = new Router();
const restify = require("restify");
const influx = require("./../../../../db/influx/controllers/db.controller");
require("dotenv").config({ path: "../../../../env/.env" });
const db = influx.connect(
  process.env.INFLUX_HOST, 
  process.env.INFLUX_DB,
  8086
);

router.use(restify.plugins.bodyParser());
router.use(restify.plugins.queryParser());

//dati sensori
router.get("/data/:licensePlate/:measured", (req, res, next) => {
  try {
    influx.getSpecificMeausure(req.params.licensePlate, req.params.measured);
    // res.send(200, [{value: "sensore1"},  {value: "sensore2"}]);
  } catch (e) {
     res.sendStatus(500).send(e);
  } finally {
    console.log(
      `[GET] /v1/sensors/data/${req.params.licensePlate}/${req.params.measured}`
    );
  }
  return next();
});

//dati singolo sensore
router.get("/data/:id", (req, res, next) => {
  try {
    res.send(200, { value: "singolo sensore" });
  } catch (e) {
    res.sendStatus(500).send(e);
  } finally {
    console.log("[GET] /v1/sensors/data/id");
  }
  return next();
});

//scrittura misura
router.post("/write/:licensePlate/:measured", (req, res, next) => {
  try {
    var influxObj = {
      measurement: req.params.licensePlate,
      fields: {
        value: req.body.value
      },
      tags: {
        sensorID: req.body.sensorID,
        measured: req.params.measured
      }
    };
    console.log("influxObj :", influxObj);
    res.send(202, influxObj);
    influx.writeOnInflux(db, influxObj);
  } catch (e) {
    res.sendStatus(500).send(e);
  } finally {
    console.log(
      `[POST] /v1/sensors/write/${req.params.licensePlate}/${
        req.params.measured
      }`
    );
  }
  return next();
});

module.exports = router;
