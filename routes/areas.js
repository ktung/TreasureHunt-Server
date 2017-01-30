/**
 * Created by lpotages on 09/01/17.
 */

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require("body-parser");
var inspect = require('util').inspect;
    app = express(); //mongo connection

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.route('/areas')
    .get(function(req, res) {
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");

        mongoose.model('Area').find({}, function (err, areas) {
            if (err) {
                return console.error(err);
            } else {
                res.format({
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(areas);
                    }
                });
            }
        });
    })
    //POST a new area
    .post(function(req, res) {
        var center = {latitude: req.body.latitude, longitude: req.body.longitude}
        var radius = req.body.radius;
        var enigmas = [];

        mongoose.model('Area').create({
            center: center,
            radius: radius,
            enigmas: enigmas
        }, function (err, area) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                console.log('POST creating new area: ' + area);
                res.format({
                    //JSON response will show the newly created area
                    json: function(){
                        res.json(area);
                    }
                });
            }
        })
    });

module.exports = router;

