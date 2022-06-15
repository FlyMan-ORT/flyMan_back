var moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usersDB = require('../data/users');


const SALT_ROUNDS = 10;

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) return res.status(400).json({error: "No se pueden enviar campos vacíos."});

        // Clean fields
        email = email.toLowerCase().trim();

        // Get user
        const user = await usersDB.getUserByEmail(email);
        if (!user || user.deletedAt) return res.status(404).json({error: "Usuario o contraseña incorrecta."});
       
        // Validate password
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(404).json({error: "Usuario o contraseña incorrecta."});

        // replace with SECRET
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({error: "Ocurrió un error al hacer login. Inténtelo nuevamente."});
    }
}

const webLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) return res.status(400).json({error: "No se pueden enviar campos vacíos."});

        // Clean fields
        email = email.toLowerCase().trim();

        // Get user
        const user = await usersDB.getUserByEmail(email);
        if (!user || user.deletedAt || !user.admin) return res.status(404).json({error: "Usuario o contraseña incorrecta."});
       
        // Validate password
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(404).json({error: "Usuario o contraseña incorrecta."});

        // replace with SECRET
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({error: "Ocurrió un error al hacer login. Inténtelo nuevamente."});
    }
}

const register = async (req, res) => {
    try {
        let { name, email, password, phone, pin, admin} = req.body;
        if (!name || !email || !password || !phone || !pin || (admin===null || admin ===undefined)) return res.status(400).json({error: "No se pueden enviar campos vacíos."});

        // Clean fields
        email = email.toLowerCase().trim();
        phone = phone.trim();

        const user = await usersDB.getUserByEmail(email);
        if (user) return res.status(400).json({error: "Ya existe un usuario con ese email registrado."});

        // Hash password
        password = await bcrypt.hash(password, SALT_ROUNDS);

        let saved = await usersDB.addUser({ name, email, password, phone, pin, admin });
        if (!saved.insertedId) return res.status(500).json({error: "Ocurrió un error al crear el usuario. Inténtelo nuevamente."});

        const token = jwt.sign({ _id: saved.insertedId }, process.env.SECRET_KEY);

        res.status(200).json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Ocurrió un error al crear el usuario. Inténtelo nuevamente."});
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await usersDB.getAllUsers();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({error: "Ocurrió un error al cargar los usuarios. Inténtelo nuevamente."});
    }
}

const getUserById = async (id) => {
    let user = await usersDB.getUserById(id);
    return user;
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, pin, admin} = req.body;
        var { password } = req.body;
        if (!id || !name || !email || !phone || !pin || (admin===null || admin ===undefined)) return res.status(400).json({error: "No se pueden enviar campos vacíos."});
        const user = await usersDB.getUserById(id);
        if (!user) return res.status(400).json({error: "Usuario inexistente."});

        (password) ? password = await bcrypt.hash(password, SALT_ROUNDS): password = user.password;
        
        const updated = await usersDB.updateUser(id, name, email, phone, pin, admin, password);
            
        if (!updated || updated.modifiedCount === 0) return res.status(500).json({error: "Ocurrió un error al modificar el usuario. Inténtelo nuevamente."});

        res.status(200).json({ updated: updated.modifiedCount > 0 });
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Ocurrió un error al modificar el usuario. Inténtelo nuevamente."});
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({error: "No se pueden enviar campos vacíos."});

        const user = await usersDB.getUserById(id);
        if (!user) return res.status(400).json({error: "Usuario inexistente."});

        const deletedAt = moment().format();
        const deleted = await usersDB.deleteUser(id, deletedAt);
        if (!deleted || deleted.modifiedCount === 0) return res.status(500).json({error: "Ocurrió un error al borrar el usuario. Inténtelo nuevamente."});

        res.status(200).json({ deleted: deleted.modifiedCount > 0 });
    } catch (error) {
        res.status(500).json({error: "Ocurrió un error al borrar el usuario. Inténtelo nuevamente."});
    }
}

const checkPin = async (req, res) => {
    try {
        const { pin } = req.body;
        const { _id: id } = req.user;
        
        if (!pin) return res.status(400).json({error: "No se pueden enviar campos vacíos."});
        const user = await usersDB.getUserById(id);
        if (!user) return res.status(400).json({error: "Usuario inexistente."});

        if (pin === user.pin) res.status(200).json({ pin: true });
        else res.status(500).json({ pin: false });
    } catch (error) {
        res.status(500).json({error: "Ocurrió un error al validar el pin. Inténtelo nuevamente."});
    }
}

module.exports = {
    login,
    webLogin,
    register,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    checkPin
}