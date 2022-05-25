const reservationsDB = require('../data/reservations');

const getAllReservationsByUser = async (req, res) => {
    try {
        const { email } = req.user;
        const reservations = await reservationsDB.getAllReservationsByEmail(email);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json();
    }
}

module.exports = { getAllReservationsByUser }