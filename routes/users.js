const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../data/users');

const SALT_ROUNDS = 10;

/* GET users listing. */
router.get('/', async (req, res) => {
  let allUsers = await users.getAllUsers();
  res.json(allUsers);
});

//Users login (APP)
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) return res.status(400).json();

    // Clean fields
    email = email.toLowerCase().trim();

    // replace with SECRET
    const token = jwt.sign({ _id: email }, process.env.SECRET_KEY);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json();
  }
});

//Users register (WEB)
router.post('/register', async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) return res.status(400).json();

    // Clean fields
    email = email.toLowerCase().trim();

    // Hash password
    password = await bcrypt.hash(password, SALT_ROUNDS);

    let saved = await users.addUser({ email, password });
    if (!saved.insertedId) return res.status(500).json({ error: 'Error' });

    const token = jwt.sign({ _id: saved.insertedId }, process.env.SECRET);

    res.status(200).json(token);
  } catch (error) {
    res.status(500).send(error.message);
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
