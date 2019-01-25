const Router = require('restify-router').Router;
const routerInstance =new Router();
var restify = require("restify");
const server = restify.createServer({
  name: 'SERVER_carIot-Project',
 // log: options.log
});


const influxManager = require("./../../db/influx/controllers/db.controller");
const sensorsRouter = require('./V1/sensors/sensors');
const carsRouter = require('./V1/cars/cars');

server.use(restify.plugins.bodyParser());

//applico rotte e prefisso
sensorsRouter.applyRoutes(server, "/v1/sensors");
carsRouter.applyRoutes(server, '/v1/cars')

server.listen(8081, function() {
  console.log("%s listening at %s", server.name, server.url);
});
