const express = require('express');
const router = express.Router();

//All reservations for web (WEB)
router.get('/', async (req, res) => { });

//All maintenance (WEB)
router.get('/:type', async (req, res) => { });

//All maintenance by id (APP)
router.get('/:type/users/:id', async (req, res) => { });

//Create maintenance reservation (WEB)
router.post('/', async (req, res) => { });

//Update maintenance reservation (WEB & APP)
router.patch('/:id', async (req, res) => { });

module.exports = router;