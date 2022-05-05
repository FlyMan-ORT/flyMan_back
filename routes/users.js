const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json('Get all users');
});

//Users login (APP)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('llegamos');

  if (!email || !password) return res.status(404).json();

  console.log(email, password);
  const accessToken = email;
  res.json({ accessToken });
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
