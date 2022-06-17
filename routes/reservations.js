const express = require('express');
const router = express.Router();
const fs = require('fs');
const authorization = require('../middlewares/authorization');
const reservationsController = require('../controllers/reservations');

router.get('/', reservationsController.getAllReservations);

router.get('/app', authorization, reservationsController.getAllReservationsByUser);

router.post('/', reservationsController.createReservation);

router.delete('/:id', reservationsController.deleteReservation);

module.exports = router;
