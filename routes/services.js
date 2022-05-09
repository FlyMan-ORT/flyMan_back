const express = require('express');
const router = express.Router();
const ServicesController = require('../controllers/services');

//Get all services
router.get('/', async (req, res) => {
    res.json('Get all services');
});

//Get all services NTH
router.get('/plate/:plate/reservation/:reservation', async (req, res) => {
    try {
        const { plate, reservation } = req.params;
        if (!plate || !reservation) return res.status(400).json();

        const service = await ServicesController.getService(plate, reservation);
        if (!service) return res.status(404).json();

        res.status(200).json({ service })
    } catch (error) {
        console.log(error)
        res.status(500).json();
    }
});

//Create services
router.post('/', async (req, res) => {
    try {
        const { plate, reservationId } = req.body;
        if (!plate || !reservationId) return res.status(400).json();

        let saved = await ServicesController.saveService(plate, reservationId);
        if (!saved.insertedId) return res.status(500).json();

        res.status(200).json({ serviceId: saved.insertedId });
    } catch (error) {
        console.log(error)
        res.status(500).json();
    }
});

//Update services
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { tasks } = req.body;
        if (!id || !tasks) return res.status(400).json();

        const service = await ServicesController.getServiceById(id);
        if (!service) return res.status(404).json();

        const updated = await ServicesController.updateService(id, tasks);
        if (!updated || updated.modifiedCount === 0) return res.status(500).json();

        res.status(200).json({ updated: updated.modifiedCount === 0 });
    } catch (error) {
        res.status(500).json();
    }
});

//Delete services?? soft delete?? 
router.delete('/:id', async (req, res) => {
    res.json('Delete service');
});

module.exports = router;