const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/authorization');
const reservationsController = require('../controllers/reservations');


//All reservations by User (App)
router.get('/app', authorization, async (req, res) => {
    const { email } = req.user;
    console.log('email');
    const response = fs.readFileSync(PATH_RESERVATIONS,"utf-8", ()=> {});
    const parsedResponse = JSON.parse(response);
    const userReservations = parsedResponse.filter((r) => r?.user?.email === email);
    res.json(userReservations);
});
router.get('/', authorization, reservationsController.getAllReservationsByUser);

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const response = fs.readFileSync(PATH_RESERVATIONS,"utf-8", ()=> {});
    const parsedResponse = JSON.parse(response);
    const userReservation = parsedResponse.find((r) => r?.id === id);
    res.json(userReservation);
});

//All maintenance (WEB)
router.get('/:type', async (req, res) => {
    res.json('All reservations by type');
});

//All maintenance by id (APP)
router.get('/:type/users/:id', async (req, res) => {
    res.json('All reservations by type and by user');
});

//Create maintenance reservation (WEB)
router.post('/', async (req, res) => {
    res.json('Create reservation');
});

//Update maintenance reservation (WEB & APP)
router.patch('/:id', async (req, res) => {
    res.json('Update reservation');
});

module.exports = router;
