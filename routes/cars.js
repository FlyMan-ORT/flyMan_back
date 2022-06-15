const express = require('express');
const router = express.Router();
const carsController = require('../controllers/cars');
const authorization = require('../middlewares/authorization');

//Get cars
router.get('/', carsController.getAllCars);

//Open car
router.post('/open', carsController.openCar);

//Close car
router.post('/close', carsController.closeCar);

module.exports = router;