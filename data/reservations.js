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
    const connectiondb = await conn.getConnection();
    const userReservations = await connectiondb
        .db(DATABASE)
        .collection(RESERVATIONS_COLLECTION)
        .find({ 'user':  { email }})
        .toArray();
    return userReservations;
}

const getReservationById = async (id) => {
    const connectiondb = await conn.getConnection();
    const reservationById = await connectiondb
        .db(DATABASE)
        .collection(RESERVATIONS_COLLECTION)
        .findOne({ id: id });
        // .findOne({ _id: new ObjectId(id) });
    return reservationById;
}

const createReservation = async (reservation) => {
    const connectiondb = await conn.getConnection();
    const res = await connectiondb
        .db(DATABASE)
        .collection(RESERVATIONS_COLLECTION)
        .insertOne(reservation);
    return res;
}

module.exports = { 
    getAllReservations,
    getAllReservationsByEmail,
    getReservationById,
    createReservation
}