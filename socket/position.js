exports = module.exports = function(io, socket){
    io.on('position', function (data) {
        var lat = data.position.coords.latitude;
        var long = data.position.coords.longitude;

        var position = {latitude: lat, longitude: long};
        socket.to(global.positionServerId).emit("userPosition", position);
    });
};