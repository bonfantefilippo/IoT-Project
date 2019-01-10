const influx = require("influx");


connectionConfig = () => {
    return new influx.InfluxDB({
        host: 'localhost',
        database: 'cars',
        port: 8086
    })
}

exports.connect = (host, db, port) => {
    return new influx.InfluxDB({
        host: host,
        database: db,
        port: port, //8086
        schema: []
    })
}

exports.writeOnInflux = (db, object) => {
  //console.log(object.fields);
  var measure =  {
    measurement: object.measurement,
    fields: object.fields,
    tags: object.tags
  };
 //console.log(measure);
 //TODO find how to manage successful publish
 console.log("[TODO] Successful publishing on InfluxDB\n")
  db
    .writePoints(
      ([
        measure
      ])
    )
    .catch(err => {
      console.error(`Error saving data to InfluxDB ${err.stack}\n`);
    });
};

exports.getAllMeasurement = () => {
  influx
  //fare query su chronograf e inserire
    .query(
      `
    show measurements
  `
    )
    .then(result => response.status(200).json(result))
    .catch(error => response.status(500).json({ error }));
};

exports.getSpecificMeausure = (licensePlate, measured) => {
  influx
  //fare query su chronograf e inserire
    .query(
      `
      SELECT mean("value") AS "mean_value" FROM "cars"."autogen"."${licensePlate}" WHERE time > now() - 1h AND "measured"='${measured}'
  `
    )
    .then(result => response.status(200).json(result))
    .catch(error => response.status(500).json({ error }));
};
