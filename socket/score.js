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
                var treated = 0;
                var enigmas = team.enigmasDone;

                for (var i = 0; i < enigmas.length; ++i) {
                    var enigma = enigmas[i];
                    mongoose.model('Enigma').findById(enigma, function (err, eg) {
                        score += 10;
                        treated++;
                        if(treated == enigmas.length){
                            socket.emit('responseScore', score);
                        }
                    });
                }
            }
        });
    });
};
