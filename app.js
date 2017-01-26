'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    exphbs  = require('express-handlebars'),// "express-handlebars"
    db = require('./models/db'),
    area = require('./models/areas'),
    team = require('./models/teams'),
    enigma = require('./models/enigmas');

var app = express();
var server = require('http').createServer(app);

var io = require('socket.io').listen(server),
    login = require('./socket/login')(io);
io.set('origins', '*:*');

app.use(bodyParser());

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var routes = require('./routes/index');
var areas = require('./routes/areas');
var enigmas = require('./routes/enigmas');

app.use('/', routes);
app.use('/', areas);
app.use('/', enigmas);

var port = process.env.PORT || 8080;
server.listen(port, function () {
    console.log('express-handlebars example server listening on: '+ port);
});