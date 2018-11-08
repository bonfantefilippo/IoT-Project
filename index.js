var restify = require('restify');

var server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.get('/cars', function(req, res, next) {
    res.send('List of cars: [TODO]');
    return next();
});

server.get('/cars/:plate', function(req, res, next) {
    res.send('Current values for car ' + req.params['plate'] + ': [TODO]');
    return next();
});

server.post('/cars/:plate', function(req, res, next) {
    res.send('Data received from plate [TODO]');

    // uncomment to see posted data
    //console.log(req.body);

    return next();
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
