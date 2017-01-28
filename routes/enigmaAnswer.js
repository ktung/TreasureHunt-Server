var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require("body-parser");
var inspect = require('util').inspect;
app = express(); //mongo connection

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.route('/enigmaAnswer')
    .get(function(req, res) {
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        mongoose.model('EnigmaAnswer').find({validated:false}, function (err, enigmas) {
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
    });

module.exports = router;
