const conn = require('./connection.js');
const DATABASE = 'FlyMan';
const USERS_COLLECTION = 'users';

async function getAllUsers() {
    const connectiondb = await conn.getConnection();
    const users = await connectiondb
        .db(DATABASE)
        .collection(USERS_COLLECTION)
        .find()
        .toArray();
    return users;
}

async function addUser(user) {
    const connectiondb = await conn.getConnection();
    const res = await connectiondb
        .db(DATABASE)
        .collection(USERS_COLLECTION)
        .insertOne(user);
    return res;
}

module.exports = { getAllUsers, addUser };