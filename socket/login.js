/**
 * Created by lpotages on 16/01/17.
 */

exports = module.exports = function(io){

    io.sockets.on('connection', function (socket) {
        console.log("New connection");
        socket.on('connectEvent', function () {
            console.log('connectEvent triggered');
            map.add(lepoint)
        });

        io.sockets.on("serverConnect", function(socket){
            global.positionServerId = socket.id;
        });

        require('./position.js')(io,socket);
    });
};