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
            mongoose.model('Area').find({}, function (err, areas) {
                if (err) {
                    return console.error(err);
                } else {
                    socket.emit('areas', res.json(areas));
                }
            });
        });

        require('./position.js')(socket);
    });
}
