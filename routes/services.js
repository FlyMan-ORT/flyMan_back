const express = require('express');
const router = express.Router();
const ServicesController = require('../controllers/services');
const authorization = require('../middlewares/authorization');

router.get('/', authorization, ServicesController.getAllServices);

router.get('/plate/:plate/reservation/:reservationId', authorization, ServicesController.getServiceByPlateAndReservation);

router.post('/', authorization, ServicesController.createService);

router.patch('/:id', authorization, ServicesController.updateService);

module.exports = router;