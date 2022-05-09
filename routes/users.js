const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../data/users');

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
    password = password.trim();

    // Get user
    const user = await users.getUserByEmail(email);
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
