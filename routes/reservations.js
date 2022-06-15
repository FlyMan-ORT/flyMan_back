const express = require('express');
const router = express.Router();
const fs = require('fs');
const authorization = require('../middlewares/authorization');
const reservationsController = require('../controllers/reservations');


//All reservations by User (App)
router.get('/', reservationsController.getAllReservations);

router.get('/app', authorization, reservationsController.getAllReservationsByUser);

router.get('/:id', reservationsController.getReservationById);

//router.get('/car/:plate', reservationsController.getReservationsByPlate);

//All maintenance (WEB)
router.get('/:type', async (req, res) => {
    res.json('All reservations by type');
});

//All maintenance by id (APP)
router.get('/:type/users/:id', async (req, res) => {
    res.json('All reservations by type and by user');
});

//Create maintenance reservation (WEB)
router.post('/', reservationsController.createReservation);

//Update maintenance reservation (WEB & APP)
router.patch('/:id', async (req, res) => {
    res.json('Update reservation');
});

router.delete('/:id', reservationsController.deleteReservation);

module.exports = router;
