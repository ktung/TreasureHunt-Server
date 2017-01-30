var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require("body-parser"),
    async = require("async");
var inspect = require('util').inspect;
app = express(); //mongo connection

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.route('/enigmaAnswer')
    .get(function(req, res){
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        mongoose.model('Enigma').find({}, function (err, enigmasFound){
            if (err) {
                console.log("Could not retrieve enigmas enigmaAnswerRoute")
            } else{
                var tabLength = enigmasFound.length;
                var finalTab = [];

                for(var i= 0; i < tabLength; i++){
                    var enig = enigmasFound[i];
                    mongoose.model('EnigmaAnswer').find({enigmaId : enigmasFound[i]._id, validated: false}, function(err,answersFound){
                        if (err){
                            console.log("Could not find enigmaAnswer for answer " + i);
                        } else {
                            finalTab.push({enigma : enig, answers: answersFound});
                            if(finalTab.length == tabLength){
                                res.format({
                                    //JSON response will show all blobs in JSON format
                                    json: function(){
                                        res.json(finalTab);
                                    }
                                });
                            }
                        }
                    })
                }
            }
        })
    })
    .post(function(req, res){
        var enigmaAnswer = req.body.enigmaAnswer;
        var valid = req.body.validated;
        mongoose.model('EnigmaAnswer').findByIdAndUpdate(
            enigmaAnswer,
            {validated: valid}, 
            null,
            function(err, model){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("EnigmaAnswer "+ enigmaAnswer +" updade "+ valid)
                }
            })
    });

module.exports = router;
