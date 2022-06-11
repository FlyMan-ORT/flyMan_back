const reservationsDB = require('../data/reservations');

const startReservation = async (reservationId) => {
    try {
        const updated = await reservationsDB.startReservation(reservationId);
        return (updated || updated.modifiedCount !== 0);
    } catch (error) {
        return false;
    }
}

module.exports = { startReservation }