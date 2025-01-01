const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({

    itemid: String,
    itemname: String,
    rentpday: String,
    finepday: String,
    availability: String,
},
    {
        collection: "Items"
    });

const Item = mongoose.model('Items', ItemSchema);
module.exports = Item;