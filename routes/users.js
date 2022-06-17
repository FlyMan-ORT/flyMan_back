const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/authorization');
const usersController = require('../controllers/users');

router.get('/', usersController.getAllUsers);

router.post('/login', usersController.login);

router.post('/web/login', usersController.webLogin);

router.post('/register', usersController.register);

router.patch('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

router.post('/pin', authorization, usersController.checkPin);

module.exports = router;