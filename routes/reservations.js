const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/authorization')

/////////////////////////////////// FILE SYSTEM ////////////////////////////////////
//lee de file system por el momento hasta que nos habilite la empresa
const fs = require('fs');
const PATH_RESERVATIONS = './data/mockUpReservations.json'
/////////////////////////////////// FILE SYSTEM ////////////////////////////////////

//All reservations for web (WEB)
router.get('/', async (req, res) => {
    const response = fs.readFileSync(PATH_RESERVATIONS,"utf-8", ()=> {});
    res.json(JSON.parse(response));
})
//All reservations by User (App)
router.get('/app', authorization, async (req, res) => {
    const { email } = req.user;
    console.log('email');
    const response = fs.readFileSync(PATH_RESERVATIONS,"utf-8", ()=> {});
    const parsedResponse = JSON.parse(response);
    const userReservations = parsedResponse.filter((r) => r?.user?.email === email);
    res.json(userReservations);
});

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
