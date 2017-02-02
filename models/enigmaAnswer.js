var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var enigmaAnswerSchema = new mongoose.Schema({
    team: String,
    validated: Boolean,
    enigmaId: String,

    answer: { type: String, required: false},
    image: { type: String, required: false},
});

mongoose.model('EnigmaAnswer', enigmaAnswerSchema);