const reservationsDB = require('../data/reservations');

const getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationsDB.getAllReservations();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json();
    }
}

const getAllReservationsByUser = async (req, res) => {
    try {
        const { email } = req.user;
        const reservations = await reservationsDB.getAllReservationsByEmail(email);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json();
    }
}

const getReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        const reservations = await reservationsDB.getReservationById(id);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json();
    }
}


module.exports = {
    getAllReservationsByUser,
    getAllReservations,
    getReservationById
}