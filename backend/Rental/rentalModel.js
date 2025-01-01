const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentalSchema = new Schema({

    rentid: String,
    rentDate: String,
    returnDate: String,
    dueDate: String,
    cost: String,
},
    {
        collection: "Rental"
    });

const Rental = mongoose.model('Rental', RentalSchema);
module.exports = Rental;