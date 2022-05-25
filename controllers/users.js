var moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usersDB = require('../data/users');


const SALT_ROUNDS = 10;

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) return res.status(400).json();

        // Clean fields
        email = email.toLowerCase().trim();

        // Get user
        const user = await usersDB.getUserByEmail(email);
        if (!user) return res.status(404).json();

        // Validate password
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(404).json();

        // replace with SECRET
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json();
    }
}

const register = async (req, res) => {
    try {
        let { name, email, password, phone } = req.body;
        if (!name || !email || !password || !phone) return res.status(400).json();

        // Clean fields
        email = email.toLowerCase().trim();
        phone = phone.trim();

        const user = await usersDB.getUserByEmail(email);
        if (user) return res.status(400).json();

        // Hash password
        password = await bcrypt.hash(password, SALT_ROUNDS);

        let saved = await usersDB.addUser({ name, email, password, phone });
        if (!saved.insertedId) return res.status(500).json({ error: 'Error' });

        const token = jwt.sign({ _id: saved.insertedId }, process.env.SECRET_KEY);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getAllUsers = async (req, res) => {
    let allUsers = await usersDB.getAllUsers();
    res.status(200).json(allUsers);
}

const getUserById = async (id) => {
    let user = await usersDB.getUserById(id);
    return user;
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;
        if (!id || !name || !email || !phone) return res.status(400).json();

        const user = await usersDB.getUserById(id);
        if (!user) return res.status(400).json();

        const updated = await usersDB.updateUser(id, name, email, phone);
        if (!updated || updated.modifiedCount === 0) return res.status(500).json();

        res.status(200).json({ updated: updated.modifiedCount > 0 });
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json();

        const user = await usersDB.getUserById(id);
        if (!user) return res.status(400).json();

        const deletedAt = moment().format();
        const deleted = await usersDB.deleteUser(id, deletedAt);
        if (!deleted || deleted.modifiedCount === 0) return res.status(500).json();

        res.status(200).json({ deleted: deleted.modifiedCount > 0 });
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
}

module.exports = { login, register, getAllUsers, getUserById, updateUser, deleteUser }