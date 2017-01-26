var mongoose = require('mongoose');
if (process.env.PORT) {
    mongoose.connect('mongodb://jacob:motdepassedejacob@ds129179.mlab.com:29179/treasurehunt');
} else {
    mongoose.connect('mongodb://localhost/treasurehunt');
}
