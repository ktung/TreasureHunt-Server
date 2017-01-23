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

router.route('/enigmas')
    .get(function(req, res) {
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");

        mongoose.model('Enigma').find({}, function (err, enigmas) {
            if (err) {
                return console.error(err);
            } else {
                res.format({
                    json: function(){
                        res.json(enigmas);
                    }
                });
            }
        });
    })
    //POST a new area
    .post(function(req, res) {
        var name = req.body.name;
        var enigma = req.body.enigma;
        var hint = req.body.hint;
        var points = req.body.points;
        var image = req.body.image;
        var area = req.body.area;

        mongoose.model('Enigma').create({
            name: name,
            enigma: enigma,
            hint: hint,
            points: points,
            image: image,
            area: area
        }, function (err, enigma) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
                console.log(err);
            } else {
                console.log('POST creating new enigma: ');

                var id = enigma._id;

                mongoose.model('Area').findByIdAndUpdate(
                    area,
                    {$push: { "enigmas" : id }}, 
                    null,
                    function(err, model){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("Added EN to AR: ")
                        }
                    })
               // mongoose.model('Area').update({ _id: area }, { $push: { enigmas: enigma._id }});

                res.format({
                    json: function(){
                        res.json(enigma);
                    }
                });
            }
        })
    });

module.exports = router;

