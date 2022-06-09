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

async function getService(id) {
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

module.exports = { saveService, getService, updateService, getAllServices, getEndedServices };