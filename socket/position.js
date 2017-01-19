exports = module.exports = function(socket){
    socket.on('sendPosition', function (data) {
        console.log(data);
        var lat = data.latitude;
        var long = data.longitude;

        var data = {id: 1, position: {latitude: lat, longitude: long}};
        socket.to(global.positionServerId).emit("userPosition", data);
    });
};