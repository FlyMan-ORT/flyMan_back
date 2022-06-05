const conn = require('./connection.js');
const { ObjectId } = require('bson');
const DATABASE = 'FlyMan';
const RESERVATIONS_COLLECTION = 'reservations';

const getAllReservations = async () => {
    const connectiondb = await conn.getConnection();
    const reservations = await connectiondb
        .db(DATABASE)
        .collection(RESERVATIONS_COLLECTION)
        .find()
        .toArray();
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