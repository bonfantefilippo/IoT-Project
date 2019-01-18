var amqp = require("amqplib");
require("dotenv").config({ path: "../../../env/.env" });

var open = amqp.connect(
  process.env.AMQP_URL,
  { servername: process.env.AMQP_SERVER }
);

var connection = open.then(conn => {
  return conn.createChannel();
});

connection.then(channel => {
  var published;
  var exchange = "smartcar";
  var routingKey = "ab123cd.temperature";
  var msg = {
    value: 55,
    sensordID: 12
  };

  return channel
    .assertExchange(exchange, "topic", { durable: true })
    .then(() => {
      var buffMsg = new Buffer(JSON.stringify(msg));

      published = channel.publish(exchange, routingKey, buffMsg, {
        persistent: true
      });
      return new Promise(resolve => {
        resolve(published);
      }).then(() => {
        console.log(`[+] Sent ${routingKey}: ${buffMsg}`);
      });
    })
    .then(() => {
      open.then(obj => obj.close());
      console.log(`[*]Connection closed.`);
      process.exit(0);
    });
});
