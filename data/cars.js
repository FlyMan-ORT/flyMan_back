const conn = require('./connection.js');
const DATABASE = 'FlyMan';
const CARS_COLLECTION = 'cars';

async function getAllCars() {
    const connectiondb = await conn.getConnection();
    const cars = await connectiondb
        .db(DATABASE)
        .collection(CARS_COLLECTION)
        .find()
        .toArray();
    return cars;
}

async function getCarByPlate(plate) {
    const connectiondb = await conn.getConnection();
    const car = await connectiondb
        .db(DATABASE)
        .collection(CARS_COLLECTION)
        .findOne({plate: plate});
    return car;
}

const updateLastServiceDate = async (plate, date) => {
    const connectiondb = await conn.getConnection();
    const updated = await connectiondb.
        db(DATABASE)
        .collection(CARS_COLLECTION)
        .updateOne(
            { "plate": plate },
            { $set: { "lastServiceDate": date } }
        );
    return updated;
}

module.exports = { getAllCars, getCarByPlate, updateLastServiceDate };
