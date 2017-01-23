var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
    name: String,
    members: [String],
    enigmasDone: [String]
});

mongoose.model('Team', teamSchema);