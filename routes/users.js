const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

/* GET users listing. */
router.get('/', usersController.getAllUsers);

//Users login (APP)
router.post('/login', usersController.login);

//Users register (WEB)
router.post('/register', usersController.register);

//Users update
router.patch('/:id', usersController.updateUser);

//Users delete (en vez de borrarlo, le crea un nuevo aributo con la fecha de baja del usuario)
router.delete('/:id', usersController.deleteUser);

module.exports = router;