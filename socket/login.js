/**
 * Created by lpotages on 16/01/17.
 */

exports = module.exports = function(io){

    io.sockets.on('connection', function (socket) {
        console.log("New connection");

        socket.on("serverConnect", function(){
            global.positionServerId = socket.id;
        });

        socket.on('newUser', function (data) {
            console.log('connectEvent triggered   '+ data.name +" "+ data.team);
            socket.emit('response', 'ok')
        });

        require('./position.js')(socket);
    });
}
