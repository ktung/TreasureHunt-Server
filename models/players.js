/**
 * Created by lpotages on 09/01/17.
 */

var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
    name: String,
    team: String,
    location: String
});

mongoose.model('Player', playerSchema);
