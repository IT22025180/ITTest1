const mongoose = require('mongoose');
const Rental = require('./rentalModel');


const addRental = async (req, res) => {
    try {

        const { rentid, rentDate, returnDate, dueDate, cost } = req.body;

        formattedrentDate = Array.isArray(rentDate) ? date.join(', ') : rentDate;
        formattedreturnDate = Array.isArray(returnDate) ? date.join(', ') : returnDate;
        formatteddueDate = Array.isArray(dueDate) ? date.join(', ') : dueDate;

        const newRental = new Rental({
            rentid,
            rentDate: formattedrentDate,
            returnDate: formattedreturnDate,
            dueDate: formatteddueDate,
            cost
        });

        await newRental.save();
        res.json({ success: true, message: 'Rental Added Successfully' });
    } catch (error) {
        console.error('Error adding Rental: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getRental = async (req, res) => {
    try {

        const allRental = await Rental.find();
        res.json({ allRental });
    } catch (error) {
        console.error('Error getting rentals: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const updateRental = async (req, res) => {

    try {

        const { _id, rentid, rentDate, returnDate, dueDate, cost } = req.body;

        formattedrentDate = Array.isArray(rentDate) ? date.join(', ') : rentDate;
        formattedreturnDate = Array.isArray(returnDate) ? date.join(', ') : returnDate;
        formatteddueDate = Array.isArray(dueDate) ? date.join(', ') : dueDate;
        const updatedRental = await Rental.findOneAndUpdate({ _id }, {

            _id,
            rentid,
            rentDate: formattedrentDate,
            returnDate: formattedreturnDate,
            dueDate: formatteddueDate,
            cost
        }, { new: true });

        if (!updatedRental) {
            return res.status(404).json({ success: false, message: 'Selected Rental not found' });
        }

        res.json({ success: true, message: 'Rental updated successfully', data: updatedItem });
    } catch (error) {
        console.error('Error updating Rental:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const deleteRental = async (req, res) => {
    try {
        const { _id } = req.body;

        const deletedRental = await Rental.findOneAndDelete({ _id });

        if (!deletedRental) {
            return res.status(404).json({ success: false, message: 'Rental not found' });
        }

        res.json({ success: true, message: 'Rental deleted successfully', data: deletedRental });
    } catch (error) {
        console.error('Error deleting Rental:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.addRental = addRental;
exports.getRental = getRental;
exports.updateRental = updateRental;
exports.deleteRental = deleteRental;
