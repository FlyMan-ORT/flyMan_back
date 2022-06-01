const fs = require('fs');

const getAllReservations = async () => {
    const response = fs.readFileSync(process.env.PATH_RESERVATIONS, "utf-8");
    const reservations = JSON.parse(response);
    return reservations;
}

const getAllReservationsByEmail = async (email) => {
    const response = fs.readFileSync(process.env.PATH_RESERVATIONS, "utf-8");
    const reservations = JSON.parse(response);
    const userReservations = reservations.filter((reservation) => reservation?.user?.email === email);
    return userReservations;
}

const getReservationById = async (id) => {
    const response = fs.readFileSync(process.env.PATH_RESERVATIONS, "utf-8");
    const parsedResponse = JSON.parse(response);
    const reservationById = parsedResponse.find((r) => r?.id === id);
    return reservationById;
}

module.exports = { 
    getAllReservations,
    getAllReservationsByEmail,
    getReservationById,
}