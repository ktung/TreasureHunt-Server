var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require("body-parser");

app = express(); //mongo connection$

var Person = mongoose.model('Team', teamSchema);

router.route('/login')
    .post(function(req,res){
        var team = req.body.team;
        var name = req.body.name;
    });