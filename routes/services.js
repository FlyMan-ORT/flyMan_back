const express = require('express');
const router = express.Router();
const ServicesController = require('../controllers/services');

//Get all services
router.get('/', ServicesController.getAllServices);

router.get('/plate/:plate/reservation/:reservation', ServicesController.getService);

//Get service by ID
router.get('/:id', ServicesController.getServiceById );

//Create services
router.post('/', ServicesController.createService);

//Update services
router.patch('/:id', ServicesController.updateService);

//Delete services?? soft delete?? 
router.delete('/:id', async (req, res) => {
    res.json('Delete service');
});

module.exports = router;