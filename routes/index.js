/**
 * Created by lpotages on 09/01/17.
 */
var express = require('express'),
    router = express.Router();

module.exports = router;

router.route('/')
.get(function(req, res) {
    res.render('home', {'envport': process.env.PORT});
});

router.route('/admin')
.get(function(req, res) {
    res.render('admin', {'envport': process.env.PORT});
});