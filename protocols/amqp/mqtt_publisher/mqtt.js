var mqtt = require("mqtt");

const connectionOptions = {
  clientId: "SmartCar_pub",
  protocolId: "MQTT",
  protocolVersion: 4
};
var client = mqtt.connect(
  "mqtt://broker.hivemq.com:1883",
  connectionOptions
);

var clientStatus;

client.on("connect", connack => {
  if (connack.returnCode != 0) {
    client.on("error", error => {
      console.log(error);
    });
  }
  console.log("[MQTT] Client connected and waiting for message...");
  clientStatus = client.connected;
});

client.on("offline", ()=>{
    console.log("[MQTT] Client offline.")
    clientStatus = client.connected;
})

function getConnectionStatus() {
    return clientStatus;
}
/**
 * topics: smartcar/v1/identificativo/sensors
 * topics: smartcar/v1/identificativo/temperature
 * topic:  smartcar/v1/identificativo/water ecc
 *  topic:  smartcar/v1/+/+ ecc
 */

//topic:  smartcar/v1/identificativo/water ecc
function publishMessage(topic, message){
    client.publish(topic, message);
    console.log("Published: "+message.toString())
}
module.exports = {getConnectionStatus, publishMessage};