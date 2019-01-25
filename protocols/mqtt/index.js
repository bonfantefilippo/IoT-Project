var mqtt = require("mqtt");
require("dotenv").config({ path: "../../env/.env" });

const connectionOptions = {
  clientId: "SmartCar_sub",
  protocolId: "MQTT",
  protocolVersion: 4
};
var client = mqtt.connect(
  "mqtt://broker.hivemq.com:1883",
  connectionOptions
);
const influxManager = require("../../db/influx/controllers/db.controller");
const db = influxManager.connect(process.env.INFLUX_HOST, process.env.INFLUX_DB, 8086);


client.on("connect", connack => {
  if (connack.returnCode != 0) {
    client.on("error", error => {
      console.log(error);
    });
  }
  console.log("Client connected and waiting for message...");
});

/**
 * topics: smartcar/v1/identificativo/sensors
 * topics: smartcar/v1/identificativo/temperature
 * topic:  smartcar/v1/identificativo/water ecc
 *  topic:  smartcar/v1/+/+ ecc
 */

//topic:  smartcar/v1/identificativo/water ecc
client.subscribe("smartcar/v1/+/+", err => {
  if (err) {
    console.log(err);
  }
});

client.on("message", (topic, message, packet) => {

  var topicSplitted = topic.split("/");
  var messageContent = JSON.parse(message.toString());

  var influxMeasure =  {
    measurement: topicSplitted[2],
    fields: 
      {
        value: messageContent.value
      },
    tags: 
      {
        sensorID:  messageContent.sensorID,
        measured: topicSplitted[3]
      }
  };

  influxManager.writeOnInflux(db, influxMeasure);
});
