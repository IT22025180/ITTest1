const express = require('express');
const routerCus = express.Router();
const CustomerController = require('./customercontroller');

routerCus.post('/addCustomer', CustomerController.addCustomer);
routerCus.get('/customers', CustomerController.getCustomer);
routerCus.post('/updateCustomer', CustomerController.updateCustomer);
routerCus.post('/deleteCustomer', CustomerController.deleteCustomer);


module.exports = routerCus;