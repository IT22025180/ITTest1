const mongoose = require('mongoose');
const Item = require('./itemModel');


const addItem = async (req, res) => {
    try {

        const { itemid, itemname, rentpday, finepday, availability } = req.body;

        const newItem = new Item({
            itemid,
            itemname,
            rentpday,
            finepday,
            availability
        });

        await newItem.save();
        res.json({ success: true, message: 'Item Added Successfully' });
    } catch (error) {
        console.error('Error adding Item: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getItem = async (req, res) => {
    try {

        const allItem = await Item.find();
        res.json({ allItem });
    } catch (error) {
        console.error('Error getting items: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const updateItem = async (req, res) => {

    try {

        const { _id, itemid, itemname, rentpday, finepday, availability } = req.body;

        const updatedItem = await Item.findOneAndUpdate({ _id }, {

            _id,
            itemid,
            itemname,
            rentpday,
            finepday,
            availability
        }, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ success: false, message: 'Selected Item not found' });
        }

        res.json({ success: true, message: 'Item updated successfully', data: updatedItem });
    } catch (error) {
        console.error('Error updating Item:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const deleteItem = async (req, res) => {
    try {
        const { _id } = req.body;

        const deletedItem = await Item.findOneAndDelete({ _id });

        if (!deletedItem) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        res.json({ success: true, message: 'Item deleted successfully', data: deletedItem });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.addItem = addItem;
exports.getItem = getItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
