const fs = require('fs');

const getAllReservationsByEmail = async (email) => {
    const response = fs.readFileSync(process.env.PATH_RESERVATIONS, "utf-8");
    const reservations = JSON.parse(response);
    const userReservations = reservations.filter((reservation) => reservation?.user?.email === email);
    return userReservations;
}

module.exports = { getAllReservationsByEmail }