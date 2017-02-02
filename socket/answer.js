var mongoose = require('mongoose');
var inspect = require('util').inspect;

exports = module.exports = function(socket){
    socket.on('sendAnswer', function (data) {
        console.log('socket sendAnswer'+ inspect(data));
        
        var teamName = data.id;

        var enigmaId = data.data.enigmeId;
        var image = data.data.image;
        var answer = data.data.answer;

        mongoose.model('EnigmaAnswer').create({
            team: teamName,
            validated: false,
            enigmaId: enigmaId,
            answer: data.data.answer,
            image: image
        }, function (err, answer) {
            if (err) {
                console.log(err);
            } else {
                console.log('EnigmaAnswer '+ answer._id +' created')
            }
        })
    });

    socket.on('enigmaValidated', function (data) {
        mongoose.model('EnigmaAnswer').findById(data.enigmaAnswer, function(err, enigmaAnswer) {
            mongoose.model('Player').find({team : enigmaAnswer.team}, function(err, players){
                if (err){
                    console.log(err);
                } else {
                    for (var i = 0; i < players.length; ++i) {
                        var player = players[i];
                        console.log("PLAYER SID "+ inspect(player.socketId));
                        if (data.validated) {
                            enigmaAnswer.update({'validated': true});
                            var socket2 = socket.to(player.socketId);
                            socket2.emit('response-enigma', 'ok');
                        } else {
                            enigmaAnswer.remove();
                            var socket2 = socket.to(player.socketId);
                            socket2.emit('response-enigma', 'ko');
                        }
                    }
                }
            })
        })
    });
};