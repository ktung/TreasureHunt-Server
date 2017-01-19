var mongoose = require('mongoose');

exports = module.exports = function(socket){
    socket.on('areasRequest', function () {
        mongoose.model('Area').find({}, function (err, areas) {
            if (err) {
                return console.error(err);
            } else {
                socket.emit('areas', areas);
            }
        });
    });
};