const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

/* GET users listing. */
router.get('/', usersController.getAllUsers);

//Users login (APP)
router.post('/login', usersController.login);

//Users register (WEB)
router.post('/register', usersController.register);

//Users delete
router.delete('/:id', async (req, res) => {
  res.json('Delete');
});

//Users update
router.patch('/:id', async (req, res) => {
  res.json('Update');
});

module.exports = router;
