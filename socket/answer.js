var mongoose = require('mongoose');
var inspect = require('util').inspect;

exports = module.exports = function(socket){
    socket.on('sendAnswer', function (data) {
        console.log('socket sendAnswer'+ inspect(data));
        var id = socket.id;

        var rand = Math.floor((Math.random() * 10) + 1);
        if (rand > 4) {
            socket.emit('response-enigma', 'ok');
        } else {
            socket.emit('response-enigma', 'ko');
        }
        
        // socket.on('receiveAnswer', function (response) {
        //     console.log('socket receiveAnswer'+ inspect(response));
            
        //     socket.to(id).emit('response-enigma', response);
        // });
    });
};