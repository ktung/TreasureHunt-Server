var mongoose = require('mongoose');
var inspect = require('util').inspect;

exports = module.exports = function(socket){
    socket.on('areasRequest', function () {
        console.log('socket areasRequest');

        mongoose.model('Area').find({}, function (err, areas) {
            if (err) {
                return console.error(err);
            } else {
                socket.emit('areas', areas);
            }
        });
    });
};