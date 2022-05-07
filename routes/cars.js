const express = require('express');
const router = express.Router();
const data = require('../data/cars')

//Get cars
router.get('/', async (req, res) => {
    let cars = await data.getAllCars();

    res.json(cars);
});

//Open car
router.post('/open', async (req, res) => {
    
    res.json('Open car');
});

//Close car
router.post('/close', async (req, res) => {
    res.json('Close car');
});

module.exports = router;