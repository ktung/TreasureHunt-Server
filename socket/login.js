/**
 * Created by lpotages on 16/01/17.
 */

var mongoose = require('mongoose');
var inspect = require('util').inspect;

exports = module.exports = function(io){

    io.sockets.on('connection', function (socket) {
        console.log("New connection");

        socket.on("serverConnect", function(){
            global.positionServerId = socket.id;
        });

        socket.on('newUser', function (data) {
            console.log('socket newUser'+ inspect(data));
            socket.join(data.team);
            handleConnection(data.name, data.team, socket);
            registerUser(data.name, data.team, socket);
        });

        socket.on('disconnect', function(){
            removeUser(socket);
        })

        require('./enigmas.js')(socket);
        require('./areas.js')(socket);
        require('./position.js')(socket);
        require('./answer.js')(socket);
        require('./chat.js')(socket, io);
        require('./score.js')(socket);
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

var registerUser = function(pseudo, team, socket){
    mongoose.model('Player').create({
        name: pseudo,
        team: team,
        socketId : socket.id
    }, function(err, player){
        if(err){
            console.log("Could not add player to database")
        }
    });
};

var removeUser = function(socket){
    mongoose.model('Player').findOneAndRemove({socketId : socket.id}, null, function(err, res){
       if (err){
           console.log("Could not remove player")
       }
    });
}

