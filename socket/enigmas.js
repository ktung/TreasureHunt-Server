var mongoose = require('mongoose');
var inspect = require('util').inspect;
var

exports = module.exports = function(socket){
    socket.on('enigmaRequest', function (data) {
        var areaId = data.data.areaId;
        var teamName = data.id;

        mongoose.model('Area').findOne({_id: areaId}).populate('enigmas').exec(function (err, area) {
            if (err) {
                return console.error(err);
            } else {
                var enigmas = area.enigmas;
                mongoose.model('Team').find({name: teamName}, function (err, teams) {
                    if (err) {
                        return console.error(err);
                    } else {
                        var team = teams[0];
                        var enigmasDone = team.enigmasDone;


                        enigmas.forEach(function(enigma) {
                            if (enigmasDone.indexOf(enigma) === -1){
                                socket.emit('enigmaRequest', enigma);
                                return;
                            }
                        })
                    }
                })
            }
        });
    });

    socket.on('askClue', function(data){

        var enigmaId = data.data.enigmeId;
        var teamId = data.id;

        mongoose.model('Enigma').find({_id : enigmaId}, function (err, enigma) {
            if (err) {
                return console.error(err);
            } else {
                var hint = enigma.hint;
                mongoose.Model('Team').update({_id: teamid}, { $inc : {hintsUsed: 1} }, function (err, data){
                    socket.emit('responseClue', hint);
                });
            }
        });

    });
};