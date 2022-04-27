const express = require(express);
const router = express.Router();

//All reservations for web (WEB)
router.get('/reservations', async (req, res) => { });

//All maintenance (WEB)
router.get('/reservations/:type', async (req, res) => { });

//All maintenance by id (APP)
router.get('/reservations/:type/users/:id', async (req, res) => { });

//Create maintenance reservation (WEB)
router.post('/reservation', async (req, res) => { });

//Update maintenance reservation (WEB & APP)
router.patch('/reservation/:id', async (req, res) => { });

module.exports = router;