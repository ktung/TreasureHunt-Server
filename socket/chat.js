var mongoose = require('mongoose');
var inspect = require('util').inspect;

exports = module.exports = function(socket, io){
    socket.on('newMessage', function (data) {
        console.log('newMessage'+ inspect(data));

        io.sockets.emit('newMessage', data);
    });
};