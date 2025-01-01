const express = require('express');
const routerRental = express.Router();
const RentalController = require('./rentalController');

routerRental.post('/addRental', RentalController.addRental);
routerRental.get('/rentals', RentalController.getRental);
routerRental.post('/updateRental', RentalController.updateRental);
routerRental.post('/deleteRental', RentalController.deleteRental);


module.exports = routerRental;