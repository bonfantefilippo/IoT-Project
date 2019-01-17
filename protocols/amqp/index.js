var amqp = require("amqplib");
var mqtt = require("./mqtt_publisher/mqtt");

require("dotenv").config();

//connection open
var open = amqp
  .connect(
    process.env.AMQP_URL,
    { servername: process.env.AMQP_SERVER }
  )
  .catch(err => {
    console.log(`Connection error:\t${err}`);
  });

open
  .then(connection => {
    return connection.createChannel().catch(err => {
      console.log(`Connection error:\t${err}`);
    });
  })
  .then(channel => {
    var exchange = "smartcar"; //coda in base alla targa o misurarilevata
    return channel
      .assertExchange(exchange, "topic", { durable: false }) //l'exchange non esisterà più al riavvio del broker
      .then(() => {
        var queue = "";
        channel
          .assertQueue(queue, { exclusive: true }) // exclusive true--> scopes the queue to the connection (defaults to false)
          .then((err, q) => {
            console.log("[*] Waiting for measurements");
            channel.bindQueue(queue, exchange, "*.*"); //ricevo tipo "ab123cd.water"

            channel.consume(
              queue,
              msg => {
                return new Promise((resolve, reject) => {
                  if (msg.content) {
                      //console.dir(mqtt.getConnectionStatus());
                    channel.ack(msg);
                    resolve(msg);
                  }/*else{
                      var meas = "Errore porco dio";
                      reject(meas)
                  }*/
                  //GESTIRE SE C'è CONNESSIONE A MQTT PER PUBBLICARE; FARE UN FILE A PARTE PER MQTT DOVE FARò TUTTA
                  //LA PARTE DI COMUNICAZIONE ANCHE SU DB
                }).then(res => {
                  console.log(
                    `[x] Received: ${res.content} as ${res.fields.routingKey}.`
                  );
                  let rkSplit = res.fields.routingKey.split('.');
                  var topic = `${res.fields.exchange}/v1/${rkSplit[0]}/${rkSplit[1]}`
                  
                  mqtt.publishMessage(topic, res.content)
                })/*.catch((err)=>{
                    console.log(err);
                });*/
              },
              { noAck: false } //mando ack
            );
          });
      });
  });
