const express = require('express');
const router = express.Router();
const carsController = require('../controllers/cars');

//Get cars
router.get('/', carsController.getAllCars);

//Open car
router.post('/open', async (req, res) => {
    res.json('Open car');
});

//Close car
router.post('/close', async (req, res) => {
    res.json('Close car');
});

module.exports = router;