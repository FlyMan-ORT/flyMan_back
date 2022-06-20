const usersController = require('../controllers/users');
const jwt = require('jsonwebtoken');

const authorization = async (req, res, next) => {
    if (req.headers["authorization"]) {
        let token = jwt.decode(req.headers["authorization"].replace("Bearer ", ""));
        let user = await usersController.getUserById(token._id);
        if (!user) {
            res.status(401).json({ error: "Usuario no autorizado." });
        } else {
            req.user = user;
            next();
        }
    } else {
        res.status(401).json({ error: "Usuario no autorizado." });
    }
}

module.exports = authorization;