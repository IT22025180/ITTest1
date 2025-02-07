const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const routerCus = require('./Customer/customerRoute');
const routerItem = require('./Item/itemRoute');
const routerRental = require('./Rental/rentalRoute');

dotenv.config();
//rest

const app = express();

const uri = 'mongodb+srv://vanuja2003:2003vanuja@cluster0.c8ywhvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to mongodb databse');
    } catch (error) {
        console.log('MongoDb error: ', error);
    }
};

connect();

app.use(cors());

app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to backend',
    });
});

app.use(express.json());

//port
const PORT = process.env.PORT || 4001;

//run
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is Running on ${PORT}`);
})



app.use('/api', routerCus);
app.use('/api', routerItem);
app.use('/api', routerRental);
