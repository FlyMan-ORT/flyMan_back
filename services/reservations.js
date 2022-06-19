const reservationsDB = require('../data/reservations');
var moment = require('moment');

const startReservation = async (reservationId) => {
    try {
        const updated = await reservationsDB.startReservation(reservationId);
        return (updated && updated.modifiedCount !== 0);
    } catch (error) {
        return false;
    }
}

const finishReservation = async (reservationId) => {
    try {
        const updated = await reservationsDB.finishReservation(reservationId);
        return (updated && updated.modifiedCount !== 0);
    } catch (error) {
        return false;
    }
}

const cancelReservation = async (reservationId) => {
    try {
        const updated = await reservationsDB.cancelReservation(reservationId);
        return (updated && updated.modifiedCount !== 0);
    } catch (error) {
        return false;
    }
}

const checkActiveReservation = async (email) => {
    try {
        const reservationsByUser = await reservationsDB.getAllReservationsByEmail(email);
        const activeReservationsByUser = reservationsByUser.some(r => r.status === "ACTIVE" && moment(r.startTime).isSame(moment(), 'day'));
        return activeReservationsByUser
    } catch (error) {
        return false
    }
}

module.exports = { startReservation, finishReservation, cancelReservation, checkActiveReservation };