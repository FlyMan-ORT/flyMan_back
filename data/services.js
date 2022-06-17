const conn = require('./connection.js');
const { ObjectId } = require('bson');
const DATABASE = 'FlyMan';
const SERVICES_COLLECTION = 'services';

async function saveService(service) {
    const connectiondb = await conn.getConnection();
    const result = await connectiondb
        .db(DATABASE)
        .collection(SERVICES_COLLECTION)
        .insertOne(service);

    return result;
}

async function getAllServices() {
    const connectiondb = await conn.getConnection();
    const services = await connectiondb
        .db(DATABASE)
        .collection(SERVICES_COLLECTION)
        .find()
        .toArray();

    return services;
}

async function getEndedServices() {
    const connectiondb = await conn.getConnection();
    const services = await connectiondb
        .db(DATABASE)
        .collection(SERVICES_COLLECTION)
        .find({ endDate: { $nin: [null] } })
        .toArray();

    return services;
}

async function getServiceByPlateAndReservation(plate, reservationId) {
    const connectiondb = await conn.getConnection();
    const service = await connectiondb
        .db(DATABASE)
        .collection(SERVICES_COLLECTION)
        .findOne({ plate, reservationId });

    return service;
}

async function updateService(id, body, endDate) {
    const { tasks, damage, tires, securityKit, documents, cleanliness, fuel } = body;
    const connectiondb = await conn.getConnection();
    const record = await connectiondb
        .db(DATABASE)
        .collection(SERVICES_COLLECTION)
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: { 
                tasks,
                damage,
                fuel,
                tires,
                securityKit,
                documents,
                cleanliness,
                endDate 
            } }
        );

    return record;
}

module.exports = { saveService, getServiceByPlateAndReservation, updateService, getAllServices, getEndedServices };