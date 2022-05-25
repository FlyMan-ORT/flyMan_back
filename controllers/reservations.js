const reservationsDB = require('../data/reservations');

const getAllReservationsByUser = async (req, res) => {
    const { email } = req.user;
    const reservations = await reservationsDB.getAllReservationsByEmail(email);
    res.status(200).json(reservations);
}

module.exports = { getAllReservationsByUser }