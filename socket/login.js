/**
 * Created by lpotages on 16/01/17.
 */

exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {
        console.log("New connection");
        socket.on('connectEvent', function () {
            console.log('connectEvent triggered');
        });
    });
}