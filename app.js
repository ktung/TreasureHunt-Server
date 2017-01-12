'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    exphbs  = require('express-handlebars'),// "express-handlebars"
    db = require('./models/db'),
    area = require('./models/areas'),
    enigma = require('./models/enigmas');

var app = express();

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

app.use('/', routes);
app.use('/', areas);

app.listen(8080, function () {
    console.log('express-handlebars example server listening on: 8080');
});