/**
 * Created by lpotages on 09/01/17.
 */

var mongoose = require('mongoose');

var enigmaSchema = new mongoose.Schema({
    name: String,
    zone: String,
    points: Number,
    enigma: String,
    image: { type: Buffer, required: false}
});

mongoose.model('Enigma', enigmaSchema);