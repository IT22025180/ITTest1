const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({

    cid: String,
    cname: String,
    contact: String,
    city: String,
    createdAt: { type: Date, default: Date.now }
},
    {
        collection: "Customer"
    });

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;