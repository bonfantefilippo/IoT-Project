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
  var test =  {
    measurement: object.measurement,
    fields: object.fields,
    tags: object.tags
  };
console.log(test);
  db
    .writePoints(
      ([
        test
      ])
    )
    .catch(err => {
      console.error(`Error saving data to InfluxDB ${err.stack}`);
    });
};

exports.getAllSensors = () => {
  influx
  //fare query su chronograf e inserire
    .query(
      `
    select * from tide
    where location =~ /(?i)(${place})/
  `
    )
    .then(result => response.status(200).json(result))
    .catch(error => response.status(500).json({ error }));
};
