exports = module.exports = function(socket){
    socket.on('sendPosition', function (data) {
        console.log(data);
        var lat = data.position.coords.latitude;
        var long = data.position.coords.longitude;

        var position = {latitude: lat, longitude: long};
        socket.to(global.positionServerId).emit("userPosition", position);
    });
};