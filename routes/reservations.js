const express = require('express');
const router = express.Router();

/////////////////////////////////// FILE SYSTEM ////////////////////////////////////
//lee de file system por el momento hasta que nos habilite la empresa
const fs = require('fs');
const PATH_RESERVATIONS = './data/mockUpReservations.json'
/////////////////////////////////// FILE SYSTEM ////////////////////////////////////

//All reservations for web (WEB)
router.get('/', async (req, res) => {
    console.log('hola')
    const response = fs.readFileSync(PATH_RESERVATIONS,"utf-8", ()=> {});       

    res.json(JSON.parse(response));
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