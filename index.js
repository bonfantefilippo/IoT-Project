const Router = require('restify-router').Router;
const routerInstance =new Router();
var restify = require("restify");
const server = restify.createServer({
  name: 'SERVER_carIot-Project',
 // log: options.log
});
const influxManager = require("./db/influx/controllers/db.controller");
const sensorsRouter = require('./V1/sensors/sensors');
const carsRouter = require('./V1/cars/cars');

server.use(restify.plugins.bodyParser());

//applico rotte e prefisso
sensorsRouter.applyRoutes(server, "/v1/sensors");
carsRouter.applyRoutes(server, 'v1/cars')

//routerInstance.applyRoutes(server);
influxManager.connect();

server.listen(8080, function() {
  console.log("%s listening at %s", server.name, server.url);
});













// separare API e Influx
/*const schema = influx.schema(
  "car",
  {
    path: InfluxModule.FieldType.STRING,
    duration: InfluxModule.FieldType.INTEGER
  },
  ["host"]
);

const connectionObject = influx.connectionObject('localhost', 'cars', schema);
const influxConnection = influx.connect(connectionObject);
influxConnection.writePoints([
  {
    measurement: 'car',
    tags: { host: 'idSensoreOlio', host: "idSs" },
    fields: { duration: 10, path: 2,  },
  }
]).then(() => {
  return influx.query(`
    select * from rpm
    where host = ${InfluxModule.escape.stringLit(os.hostname())}
    order by time desc
    limit 10
  `)
}).then(rows => {
  rows.forEach(row => console.log(`A request to ${row.path} took ${row.duration}ms`))
})*/
