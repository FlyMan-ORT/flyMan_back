const express = require('express');
const router = express.Router();
const ServicesController = require('../controllers/services');
const authorization = require('../middlewares/authorization');

//Get all services
router.get('/', ServicesController.getAllServices);

router.get('/plate/:plate/reservation/:reservationId', authorization, ServicesController.getServiceByPlateAndReservation);

router.get('/:id', ServicesController.getService);

//Create services
router.post('/', authorization, ServicesController.createService);

//Update services
router.patch('/:id', ServicesController.updateService);

//Delete services?? soft delete?? 
router.delete('/:id', async (req, res) => {
    res.json('Delete service');
});

module.exports = router;