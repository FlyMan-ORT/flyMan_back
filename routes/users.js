const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/authorization');
const usersController = require('../controllers/users');

router.get('/', authorization, usersController.getAllUsers);

router.post('/login', usersController.login);

router.post('/web/login', usersController.webLogin);

router.post('/register', authorization, usersController.register);

router.patch('/:id', authorization, usersController.updateUser);

router.delete('/:id', authorization, usersController.deleteUser);

router.post('/pin', authorization, usersController.checkPin);

module.exports = router;