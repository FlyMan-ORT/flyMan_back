const reservationsDB = require('../data/reservations');

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
    console.log("entrando?", email)
    try{
        const reservationsByUser = await reservationsDB.getAllReservationsByEmail(email);
        const activeReservationsByUser = reservationsByUser.filter(r => r.status=== "ACTIVE");                                                  
        return (activeReservationsByUser) ? true: false;
    } catch(error){
        return false
    }
}

module.exports = { startReservation, finishReservation, cancelReservation, checkActiveReservation };