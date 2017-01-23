/**
 * Created by lpotages on 09/01/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var enigmaSchema = new mongoose.Schema({
    name: String,
    enigma: String,
    hint: [String],
    points: Number,
    image: { type: String, required: false},

    area: {type: Schema.Types.ObjectId, ref: 'Area'}
});

mongoose.model('Enigma', enigmaSchema);