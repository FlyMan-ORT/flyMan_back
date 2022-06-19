const express = require('express');
const router = express.Router();
const carsController = require('../controllers/cars');
const authorization = require('../middlewares/authorization');

router.get('/', authorization, carsController.getAllCars);

router.post('/open/:plate', authorization, carsController.openCar);

router.post('/close/:plate', authorization, carsController.closeCar);

module.exports = router;