const influx = require("influx");

connectionConfig = () => {
    return new influx.InfluxDB({
        host: 'localhost',
        database: 'cars',
        port: 8086
    })
}

exports.connect = () => {
    return connectionConfig();
}
exports.writeOnInflux = (object) => {
  influx
    .writePoints(
      (schema = [
        {
          measurement: object.measurement,
          tags: object.tags,
          fields: object.fields
        }
      ]) /*, {
            database: 'ocean_tides',
            precision: 's',
         }*/
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
