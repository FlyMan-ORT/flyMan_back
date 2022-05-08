const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET = 'SECRET_KEY';

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json('Get all users');
});

//Users login (APP)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json();

    // Clean fields
    email = email.toLowerCase().trim();
    password = password.trim();

    // replace with SECRET
    const token = jwt.sign({ id: email }, process.env.SECRET_KEY);
    console.log(token);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json();
  }
});

//Users register (WEB)
router.post('/register', async (req, res) => {
  res.json('Register');
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
