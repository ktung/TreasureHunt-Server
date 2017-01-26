var inspect = require('util').inspect;

exports = module.exports = function(socket){
    socket.on('sendPosition', function (response) {
        console.log('socket sendPosition'+ inspect(response));
        var lat = response.data.latitude;
        var long = response.data.longitude;

        var team = response.id;
        var data = {id: team, position: {latitude: lat, longitude: long}};
        socket.to(global.positionServerId).emit("userPosition", data);
    });
};