var mongoose = require('mongoose');
var inspect = require('util').inspect;

exports = module.exports = function(socket){
    socket.on('askScore', function(data) {
        console.log('socket askScore '+ inspect(data));

        var teamName = data.id;
        mongoose.model('Team').findOne({name: teamName}, function (err, team) {
            if (err) {
                return console.error(err);
            } else {
                var score = 0;
                var enigmas = team.enigmasDone;

                enigmas.forEach(function(enigma) {
                    mongoose.model('Enigma').findById(enigma, function (err, eg) {
                        score += eg.points;
                    });
                });

                socket.emit('responseScore', {result: score});
            }
        });
    });
};
