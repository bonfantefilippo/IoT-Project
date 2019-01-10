# SmartCar IoT Project

IoT project that provide communication between SmartCart data_simulator e database(s).
This server is useful to receive and retreive data through different protocols:
 - HTTP
 - MQTT
 - CoAP

Then, there is also an implementation to write data on [InfluxDB](https://www.influxdata.com/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Neccessary technology useful to start the project

```
NodeJS
Postman (or other services to call API)
InfluxDB (not necessary)
```

### Installing

A step by step series of examples that tell you how to get a development env running

Step:

```
npm install //install al packages

Choose the protocol folder you want to use and run:
node index //start server
```



## Built With

* [NodeJS](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine
* [Restify](http://restify.com/) - Node.js web service framework optimized for building semantically correct RESTful web services
* [MQTT](https://www.npmjs.com/package/mqtt) - MQTT.js is an OPEN Open Source Project
* [CoAP](https://www.npmjs.com/package/coap) - Constrained Application Protocol (CoAP) is a software protocol intended to be used in very simple electronics devices that allows them to communicate interactively over the Internet
* [Node-Influx](https://github.com/node-influx/node-influx) - A module for simplify all Influx operations with NodeJS

## HTTP 
```
Open Postman
Choose HTTP Verbs
Insert url
Send Request
```
For example:
Verb: GET
URL: http://localhost:8080/v1/sensors/

Send request

### Versioning
I used [Restify](http://semver.org/) for API versioning. 



## MQTT

Open a [WebSocketClient](http://www.hivemq.com/demos/websocket-client/) or create one

Set up settings:
* Host: *your host* or (for example) [HiveMQ](broker.hivemq.com)
* Port: *your port* [HiveMQ](broker.hivemq.com) port is 8000

Try connection

Set topic as __smartcar/v1/*licenseplate*/*relevatedmeasure*__
 * *smartcar/v1/ab123cd/temperature*

Set message payload as:

    {
      value: 222,
      sensorID: 125
    }
Try publishing


## CoAP
Find or create a CoAP client to send messages

The path of your request should have the __/*licensplate*/*relevatedmeasure*__
* *coap://www.abcd.com:5683/ab123cd/temperature*

Set up the **Content-Format** or **Content-Type** in **application/json** of your message *header*

Set message payload as:

    {
      value: 222,
      sensorID: 125
    }

Try publishing







## Authors

* **Filippo Bonfante** - *IoTProject* - [BonfanteFilippo](https://github.com/bonfantefilippo)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration

