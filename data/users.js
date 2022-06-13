const conn = require('./connection.js');
const { ObjectId } = require('bson');
const DATABASE = 'FlyMan';
const USERS_COLLECTION = 'users';

async function getAllUsers() {
    const connectiondb = await conn.getConnection();
    const users = await connectiondb
        .db(DATABASE)
        .collection(USERS_COLLECTION)
        .find()
        .toArray();
//{deletedAt:{$nin:[null]}}
    return users.filter(item => !(item.hasOwnProperty("deletedAt")));
}

async function getUserByEmail(email) {
    const connectiondb = await conn.getConnection();
    const user = await connectiondb
        .db(DATABASE)
        .collection(USERS_COLLECTION)
        .findOne({ email: email });

    return user;
}

async function getUserById(id) {
    const connectiondb = await conn.getConnection();
    const user = await connectiondb
        .db(DATABASE)
        .collection(USERS_COLLECTION)
        .findOne({ _id: new ObjectId(id) });

    return user;
}

async function addUser(user) {
    const connectiondb = await conn.getConnection();
    const res = await connectiondb
        .db(DATABASE)
        .collection(USERS_COLLECTION)
        .insertOne(user);

    return res;
}

async function updateUser(id, name, email, phone, pin, password) {
    const connectiondb = await conn.getConnection();
    const record = await connectiondb
        .db(DATABASE)
        .collection(USERS_COLLECTION)
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: { name: name, email: email, phone: phone, pin:pin, password: password } }
        );
    return record;
}

async function deleteUser(id, deletedAt) {
    const connectiondb = await conn.getConnection();
    const record = await connectiondb
        .db(DATABASE)
        .collection(USERS_COLLECTION)
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: { deletedAt: deletedAt } }
        );
    return record;
}

module.exports = { getAllUsers, addUser, getUserByEmail, getUserById, updateUser, deleteUser };