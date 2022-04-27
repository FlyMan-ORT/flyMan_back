const express = require('express');
const router = express.Router();

//Get cars
router.get('/', async (req, res) => {
    res.json('Get cars');
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