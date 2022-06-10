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
        .find({ 'user': { email } })
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

const getReservationsByPlate = async (plate) => {
    const connectiondb = await conn.getConnection();
    const reservationByPlate = await connectiondb
        .db(DATABASE)
        .collection(RESERVATIONS_COLLECTION)
        .find({ 'car.plate': plate })
        .toArray();
    return reservationByPlate;
}

const createReservation = async (reservation) => {
    const connectiondb = await conn.getConnection();
    const res = await connectiondb
        .db(DATABASE)
        .collection(RESERVATIONS_COLLECTION)
        .insertOne(reservation);
    return res;
}

const startReservation = async (reservationId) => {
    const connectiondb = await conn.getConnection();
    const record = await connectiondb
        .db(DATABASE)
        .collection(USERS_COLLECTION)
        .updateOne(
            { _id: new ObjectId(reservationId) },
            { $set: { status: "ACTIVE" } }
        );
    return record;
}

module.exports = {
    getAllReservations,
    getAllReservationsByEmail,
    getReservationById,
    getReservationsByPlate,
    createReservation,
    startReservation
}