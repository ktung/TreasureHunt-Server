/**
 * Created by lpotages on 16/01/17.
 */

var mongoose = require('mongoose');

exports = module.exports = function(io){

    io.sockets.on('connection', function (socket) {
        console.log("New connection");

        socket.on("serverConnect", function(){
            global.positionServerId = socket.id;
        });

        socket.on('newUser', function (data) {
            console.log('connectEvent triggered   '+ data.name +" "+ data.team);
            handleConnection(data.name, data.team, socket);
            //socket.emit('response', 'ok');
        });

        require('./enigmas.js')(socket);
        require('./areas.js')(socket);
        require('./position.js')(socket);
        require('./answer.js')(socket);
        require('./chat.js')(socket, io);
    });
};

var handleConnection =function(pseudo, team, socket){
    mongoose.model('Team').find({name: team}, function (err, teams) {
        if (err) {
            return console.error(err);
        } else {
            if(teams.length == 0){
                // On créer l'équipe et on ajoute la personne à l'équipe
                mongoose.model('Team').create({
                    name: team,
                    members: [pseudo],
                    enigmasDone: [],
                    hintsUsed: 0
                }, function (err, area) {
                    if (err) {
                        res.send("Could not create user");
                    } else {
                        console.log('Creating new team ' + team);
                        socket.emit('response', 'ok');
                    }
                });

            }else{
                // On valide la connexion
                socket.emit('response', 'ok');
            }
        }
    });
};

