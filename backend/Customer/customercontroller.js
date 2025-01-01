const mongoose = require('mongoose');
const Customer = require('./customerModel');


const addCustomer = async (req, res) => {
    try {

        const { cid, cname, contact, city } = req.body;

        const newCustomer = new Customer({
            cid,
            cname,
            contact,
            city
        });

        await newCustomer.save();
        res.json({ success: true, message: 'Customer Added Successfully' });
    } catch (error) {
        console.error('Error adding Customet: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getCustomer = async (req, res) => {
    try {

        const allCustomer = await Customer.find();
        res.json({ allCustomer });
    } catch (error) {
        console.error('Error getting Customer: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const updateCustomer = async (req, res) => {

    try {

        const { _id, cid, cname, contact, city } = req.body;

        const updatedCustomer = await Customer.findOneAndUpdate({ _id }, {

            _id,
            cid,
            cname,
            contact,
            city
        }, { new: true });

        if (!updatedCustomer) {
            return res.status(404).json({ success: false, message: 'Selected Customer not found' });
        }

        res.json({ success: true, message: 'Customer updated successfully', data: updatedCustomer });
    } catch (error) {
        console.error('Error updating Customer:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const { _id } = req.body;

        const deletedCustomer = await Customer.findOneAndDelete({ _id });

        if (!deletedCustomer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        res.json({ success: true, message: 'Customer deleted successfully', data: deletedCustomer });
    } catch (error) {
        console.error('Error deleting Customer:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.addCustomer = addCustomer;
exports.getCustomer = getCustomer;
exports.updateCustomer = updateCustomer;
exports.deleteCustomer = deleteCustomer;
