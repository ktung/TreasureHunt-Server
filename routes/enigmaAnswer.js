var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require("body-parser"),
    async = require("async");
var inspect = require('util').inspect;
app = express(); //mongo connection

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.route('enigmaAnswer')
    .get(function(req, res){
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");

        mongoose.model('Enigma').find({}, function (err, enigmasFound){
            if (err) {
                console.log("Could not retrieve enigmas enigmaAnswerRoute")
            } else{
                var enigmas = enigmasFound; // Tableau avec toutes les enigmes
                var tabLength = enigmasFound.length;

                var finalTab = [];

                for(var i= 0; i < tabLength; i++){
                    mongoose.model('EnigmaAnswer').find({_id : enigmas[i]._id}, function(err,answersFound){
                        if (err){
                            console.log("Could not find enigmaAnswer for answer " + i);
                        } else {
                            finalTab.push({enigma : enigmas[i], answers: answersFound});;
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
    });

/*router.route('/enigmaAnswer')
 .get(function(req, res) {
 res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");

 var p1 = new Promise(function(resolve, reject) {
 mongoose.model('EnigmaAnswer').find({validated:false}, function (err, enigmasAnswer) {
 if (err) {
 return console.error(err);
 } else {
 var p2 = new Promise(function(resolve, reject) {
 var response = [];

 var i = 0;
 console.log(i)
 console.log(enigmasAnswer.length)
 async.whilst(function() {
 i < enigmasAnswer.length
 }, function(next) {
 console.log(i)
 var answer = enigmasAnswer[i];
 if (null != answer.enigmaId) {
 response.push("lfsj")
 mongoose.model('Enigma')
 .findById(answer.enigmaId, function(err, enigma) {
 console.log(response)
 });
 }

 ++i;
 next();
 }, function(err) {
 resolve(response);
 })
 });
 p2.then(function(data) {
 resolve(data);
 }).catch(function(err) {
 console.log("Error promise : "+ err)
 })
 }

 });
 });
 p1.then(function(data) {
 res.format({
 json: function(){
 res.json(data);
 }
 });
 }).catch(function() {
 console.log("Erreur promise")
 });
 });
 */
module.exports = router;
