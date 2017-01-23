/**
 * Created by lpotages on 09/01/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var areaSchema = new mongoose.Schema({
    center: {
        latitude: String,
        longitude: String
    },
    radius: Number,
    enigmas: [{type: Schema.Types.ObjectId, ref: 'Enigma'}]
});

mongoose.model('Area', areaSchema);
