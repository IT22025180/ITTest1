const express = require('express');
const routerItem = express.Router();
const ItemController = require('./itemController');

routerItem.post('/addItem', ItemController.addItem);
routerItem.get('/items', ItemController.getItem);
routerItem.post('/updateItem', ItemController.updateItem);
routerItem.post('/deleteItem', ItemController.deleteItem);


module.exports = routerItem;