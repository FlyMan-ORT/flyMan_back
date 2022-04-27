const express = require('express');
const router = express.Router();

//Get all services
router.get('/', async (req, res) => {
    res.json('Get all services');
});

//Get all services NTH
router.get('/user/:id', async (req, res) => {
    res.json('Get all services by user');
});

//Create services
router.post('/', async (req, res) => {
    res.json('Create service');
});

//Update services
router.patch('/:id', async (req, res) => {
    res.json('Update service');
});

//Delete services?? soft delete?? 
router.delete('/:id', async (req, res) => {
    res.json('Delete service');
});

module.exports = router;