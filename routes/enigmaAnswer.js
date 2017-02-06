var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require("body-parser"),
    io = require("socket.io")
var inspect = require('util').inspect;
app = express(); //mongo connection

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = function(io) {
    router.route('/enigmaAnswer')
        .get(function(req, res){
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
            mongoose.model('Enigma').find({}, function (err, enigmasFound){
                if (err) {
                    console.log("Could not retrieve enigmas enigmaAnswerRoute")
                } else{
                    var tabLength = enigmasFound.length;
                    var finalTab = [];

                    enigmasFound.forEach(function(enig){
                        mongoose.model('EnigmaAnswer').find({enigmaId : enig._id, validated: false}, function(err,answersFound){
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
                    })
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
                        console.log("EnigmaAnswer "+ enigmaAnswer +" update "+ valid);

                        if (valid){
                            var teamName = model.team;
                            var enigmaId = model.enigmaId;

                            mongoose.model('Team').findOneAndUpdate({name: teamName},
                                {$push: {enigmasDone: enigmaId}},
                                null,
                                function (err,res){
                                    if(err) {
                                        console.log("Could not update team")
                                    } else {
                                        console.log("Success add already done enigmas for team")
                                    }
                                });
                        }
                    }
                })

        });

    return router;
}
