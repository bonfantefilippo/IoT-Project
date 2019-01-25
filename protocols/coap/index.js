var coap = require("coap"),
  server = coap.createServer();
const influxManager = require("../../db/influx/controllers/db.controller");
require("dotenv").config({ path: "../../../../env/.env" });
const db = influxManager.connect(
  process.env.INFLUX_HOST,
  process.env.INFLUX_DB,
  8086
);

server.on("request", (req, res) => {
  console.log(`Message received\n`);
  /**
     * {
          value: 222,
          sensorID: 125
        }
     */
  var payload = JSON.parse(req.payload.toString());
  var url = req.url.split("/");

  var influxObj = {
    measurement: url[1], //targa
    fields: {
      value: payload.value
    },
    tags: {
      sensorID: payload.sensorID,
      measured: url[2] //payload
    }
  };

  influxManager.writeOnInflux(db, influxObj);
  res.end("Received");
  res.end(req);
});

server.listen(5683, "localhost", () =>
  console.log(`Server listening on ${server._address}:${server._port}\n`)
);
