var mongoose = require('mongoose');
var inspect = require('util').inspect;

exports = module.exports = function(socket){
    socket.on('sendAnswer', function (data) {
        console.log('sendAnswer'+ inspect(data));

        var rand = Math.floor((Math.random() * 10) + 1);
        if (rand > 4) {
            socket.emit('response-enigma', 'ok');
        } else {
            socket.emit('response-enigma', 'ko');
        }
    });
};