var amqp = require("amqplib");
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
    var exchange = "topic_test"; //coda in base alla targa o misurarilevata
    return channel
      .assertExchange(exchange, "topic", { durable: false }) //l'exchange non esisterà più al riavvio del broker
      .then(() => {
        var queue = "";
        channel
          .assertQueue(queue, { exclusive: true }) // exclusive true--> scopes the queue to the connection (defaults to false)
          .then((err, q) => {
            console.log("[*] Waiting for measurements");
            channel.bindQueue(queue, exchange, "water");

            channel.consume(
              queue,
              msg => {
                return new Promise(resolve => {
                  if (msg.content) {
                      channel.ack(msg);
                    resolve(msg);
                  }
                  //GESTIRE SE C'è CONNESSIONE A MQTT PER PUBBLICARE; FARE UN FILE A PARTE PER MQTT DOVE FARò TUTTA
                  //LA PARTE DI COMUNICAZIONE ANCHE SU DB
                }).then(res => {
                  console.log(
                    `[x] Received: ${res.content} as ${res.fields.routingKey}.`
                  );
                });
              },
              { noAck: false } //mando ack
            );
          });
      });
  });
