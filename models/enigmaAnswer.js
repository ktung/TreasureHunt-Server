var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var enigmaAnswerSchema = new mongoose.Schema({
    team: String,
    validated: Boolean,
    enigma: String,
    points: Number,
    image: { type: String, required: false},

    area: {type: Schema.Types.ObjectId, ref: 'Area'}
});

mongoose.model('EnigmaAnswer', enigmaAnswerSchema);