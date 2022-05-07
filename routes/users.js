const express = require('express');
const router = express.Router();
const users = require('../data/users')

/* GET users listing. */
router.get('/', async (req, res) => {
  let allUsers = await users.getAllUsers();
  res.json(allUsers);
});

//Users login (APP)
router.post('/login', async (req, res) => {
  res.json('Login');
});

//Users register (WEB)
router.post('/register', async (req, res) => {
  //res.json('Register a new user');
  try {
    res.send(await users.addUser(req.body));
  } catch (error) {
    res.send(error.message);
  } 
});

//Users delete
router.delete('/:id', async (req, res) => {
  res.json('Delete');
});

//Users update
router.patch('/:id', async (req, res) => {
  res.json('Update');
});

module.exports = router;
