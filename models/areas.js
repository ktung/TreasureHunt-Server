/**
 * Created by lpotages on 09/01/17.
 */

var mongoose = require('mongoose');

var areaSchema = new mongoose.Schema({
    center: {
        latitude: String,
        longitude: String
    },
    radius: Number,
    enigmas: [String]
});

mongoose.model('Area', areaSchema);
