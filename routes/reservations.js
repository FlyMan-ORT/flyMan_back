const express = require('express');
const router = express.Router();

//All reservations for web (WEB)
router.get('/', async (req, res) => {
    res.json('All reservations');
});

//All maintenance (WEB)
router.get('/:type', async (req, res) => {
    res.json('All reservations by type');
});

//All maintenance by id (APP)
router.get('/:type/users/:id', async (req, res) => {
    res.json('All reservations by type and by user');
});

//Create maintenance reservation (WEB)
router.post('/', async (req, res) => {
    res.json('Create reservation');
});

//Update maintenance reservation (WEB & APP)
router.patch('/:id', async (req, res) => {
    res.json('Update reservation');
});

module.exports = router;