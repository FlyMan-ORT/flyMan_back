const express = require('express');
const router = express.Router();
const carsController = require('../controllers/cars');
const authorization = require('../middlewares/authorization');

router.get('/', carsController.getAllCars);

router.post('/open/:plate', carsController.openCar);

router.post('/close/:plate', carsController.closeCar);

module.exports = router;