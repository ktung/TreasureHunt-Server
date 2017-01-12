var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
    name: String
});

mongoose.model('Team', teamSchema);