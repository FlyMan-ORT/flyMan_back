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

async function getService(plate, reservation) {
    const connectiondb = await conn.getConnection();
    const service = await connectiondb
        .db(DATABASE)
        .collection(SERVICES_COLLECTION)
        .findOne({ plate: plate, reservationId: reservation });

    return service;
}

async function getServiceById(id) {
    const connectiondb = await conn.getConnection();
    const service = await connectiondb
        .db(DATABASE)
        .collection(SERVICES_COLLECTION)
        .findOne({ _id: new ObjectId(id) });

    return service;
}

async function updateService(id, tasks, endDate) {
    const connectiondb = await conn.getConnection();
    const record = await connectiondb
        .db(DATABASE)
        .collection(SERVICES_COLLECTION)
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: { tasks: tasks, endDate: endDate } }
        );

    return record;
}

module.exports = { saveService, getService, getServiceById, updateService };