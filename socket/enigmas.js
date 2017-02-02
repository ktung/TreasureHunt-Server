var mongoose = require('mongoose');
var inspect = require('util').inspect;

exports = module.exports = function(socket){
    socket.on('enigmaRequest', function (data) {
        console.log('socket enigmaRequest'+ inspect(data));

        var areaId = data.data.areaId;
        var teamName = data.id;
        console.log("teamName: " + teamName);

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

                        for (var i = 0; i < enigmas.length; i++){
                            if (enigmasDone.indexOf(enigmas[i]._id) === -1){
                                socket.emit('enigmaRequest', enigmas[i]);
                                break
                            }
                        }

                        if(enigmas.length == enigmasDone.length){
                            socket.emit('noEnigma', "No more enigma");
                        }
                    }
                })
            }
        });
    });

    socket.on('askClue', function(data){
        console.log('socket askClue'+ inspect(data));

        var enigmaId = data.data.enigmeId;
        var teamName = data.id;

        mongoose.model('Enigma').findOne({_id : enigmaId}, function (err, enigma) {
            if (err) {
                return console.error(err);
            } else {
                console.log('Enigma :'+ inspect(enigma));
                var hint = enigma.hint;
                mongoose.model('Team')
                .findOneAndUpdate(
                    { name: teamName },
                    { $inc: { hintsUsed: 1 } }
                )
                .exec(function(err,res) {
                    if (err) {
                        console.log("Error");
                    } else {
                        socket.emit('responseClue', hint);
                    }
                });
            }
        });
    });
};