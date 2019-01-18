var amqp = require("amqplib");
var mqtt = require("./mqtt_publisher/mqtt");

require("dotenv").config({ path: "../../env/.env" });

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
      .assertExchange(exchange, "topic", { durable: true }) //l'exchange esisterà al riavvio del broker
      .then(() => {
        var queue = "";
        channel
          .assertQueue(queue, { exclusive: true, durable: true }) // exclusive true--> scopes the queue to the connection (defaults to false)
          .then((err, q) => {
            console.log("[*] Waiting for measurements");
            channel.bindQueue(queue, exchange, "*.*"); //ricevo tipo "ab123cd.water"

            channel.consume(
              queue,
              msg => {
                return new Promise((resolve, reject) => {
                  if (mqtt.getConnectionStatus()) {
                    channel.ack(msg);
                    //console.log(msg);
                    resolve(msg);
                  } else {
                    channel.nack(msg);
                    reject(msg);
                  }
                })
                  .then(res => {
                    console.log(
                      `[x] Received: ${res.content} as ${
                        res.fields.routingKey
                      }.`
                    );
                    let rkSplit = res.fields.routingKey.split(".");
                    var topic = `${res.fields.exchange}/v1/${rkSplit[0]}/${
                      rkSplit[1]
                    }`; //mqtt topic

                    mqtt.publishMessage(topic, res.content); //pubblicazione via mqtt
                  })
                  .catch(res => {
                   // console.log("[MQTT err] Message not published on MQTT");    
                  });
              },
              { noAck: false } //mando ack
            );
          });
      });
  });
