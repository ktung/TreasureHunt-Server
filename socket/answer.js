var mongoose = require('mongoose');
var inspect = require('util').inspect;

exports = module.exports = function(socket){
    socket.on('sendAnswer', function (data) {
        console.log('socket sendAnswer'+ inspect(data));
        
        var teamName = data.id;

        var enigmaId = data.data.enigmaId;
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
                console.log('EnigmaAnswer created')
            }
        })
        // var rand = Math.floor((Math.random() * 10) + 1);
        // if (rand > 4) {
        //     socket.emit('response-enigma', 'ok');
        // } else {
        //     socket.emit('response-enigma', 'ko');
        // }
        // {"enigmaId": "5889cb40fbca7d173db3c9a3"}
    });
};