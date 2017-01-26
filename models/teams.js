var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
    name: String,
    members: [String],
    enigmasDone: [String],
    hintsUsed: Number
});

mongoose.model('Team', teamSchema);