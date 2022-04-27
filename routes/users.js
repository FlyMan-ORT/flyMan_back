const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//Users login (APP)
router.post('/login', async (req, res) => {
  res.json('Login');
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
