var mongoose = require('mongoose');

exports = module.exports = function(socket){
    socket.on('enigmaRequest', function (data) {
        var areaId = data.data.areaId;
        var teamName = data.id;

        mongoose.model('Area').find({_id: areaId}).populate('enigmas').run(function (err, areas) {
            if (err) {
                return console.error(err);
            } else {
                var enigmas = areas.enigmas;

                mongoose.model('Team').find({name: teamName}, function (err, teams) {
                    if (err) {
                        return console.error(err);
                    } else {
                        var team = teams[0];
                        var enigmasDone = team.enigmasDone;

                        if(enigmas.filter)

                        for (var enigma in enigmas){
                            if (!enigmasDone.includes(enigma)){
                                socket.emit('newEnigma', enigma);
                                break;
                            }
                        }
                    }
                });
            }
        });
    });
};