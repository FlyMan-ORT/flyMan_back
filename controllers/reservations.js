const reservationsDB = require('../data/reservations');
const usersDB = require('../data/users');
const moment = require('moment')

const getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationsDB.getAllReservations();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json();
    }
}

const getAllReservationsByUser = async (req, res) => {
    try {
        const { email } = req.user;
        const reservations = await reservationsDB.getAllReservationsByEmail(email);
        const filteredReservations = reservations.filter((r)=> moment().isSame(r.startTime, 'day') && 
                                                                    r.bookingType == "MAINTENANCE" && 
                                                                    (r.status == "RESERVED" || r.status == "ACTIVE"))

        res.status(200).json(filteredReservations);
    } catch (error) {
        res.status(500).json();
    }
}

const getReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        const reservations = await reservationsDB.getReservationById(id);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json();
    }
}

// const getReservationsByPlate = async (req, res) => {
//     try {
//         const { plate } = req.params;
//         const reservations = await reservationsDB.getReservationsByPlate(plate);
//         res.status(200).json(reservations);
//     } catch (error) {
//         res.status(500).json();
//     }
// }

const createReservation = async (req, res) => {
    try {
        let { car, employeeMail, reservationDay, reservationTime } = req.body;
        if (!car || !employeeMail || !reservationDay || !reservationTime) return res.status(400).json();

        const user = await usersDB.getUserByEmail(employeeMail);
        if (!user) return res.status(400).json();
       
        // Create the correct date format
        const startTime = moment(`${reservationDay} ${reservationTime}`).utc().format();
        // Add 1 hour to the startTime
        let endTime = moment(startTime).add(1,'hours').utc().format();

        const userReservations = await reservationsDB.getAllReservationsByEmail(employeeMail);
        const userOcuppied = userReservations.some((r)=> moment(startTime).utc().isSame(r.startTime, 'day')
                                                                && moment(startTime).utc().isBetween(moment(r.startTime).subtract(1, 'minutes'), r.endTime, 'hour')
                                                                && r.bookingType == "MAINTENANCE" 
                                                                && (r.status == "RESERVED" || r.status == "ACTIVE"))
        
        if (userOcuppied) return res.status(400).json({error: "Este operario esta ocupado a esta hora"});

        const carReservations = await reservationsDB.getReservationsByPlate(car.plate);
        const isReserved = carReservations.some((r)=> moment(startTime).utc().isSame(r.startTime, 'day')
                                                                && moment(startTime).utc().isBetween(moment(r.startTime).subtract(1, 'minutes'), r.endTime, 'hour')
                                                                && (r.status == "RESERVED" || r.status == "ACTIVE"))

        if (isReserved) return res.status(400).json({error: "Este auto tiene una reserva a esta hora"});

        // Actualmente guarda los horarios con UTC a pedido de Gero, es decir 3hs más de las que hay en Arg
        const reservation = {
            "status": "RESERVED",
            "startTime": startTime,
            "endTime": endTime,
            "startParkingName": "",
            "billingStatus": "ON_HOLD",
            "fuelStart": 0.0,
            "endFuel": null,
            "car": car,
            "user": {
                "email": employeeMail
            },
            "createdAt": moment.utc().format(),
            "bookingType": "MAINTENANCE"
        }       
        
        let saved = await reservationsDB.createReservation(reservation);
        if (!saved.insertedId) return res.status(500).json({ error: 'Error' });

        res.status(200).json(saved.insertedId);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    getAllReservationsByUser,
    getAllReservations,
    getReservationById,
    //getReservationsByPlate,
    createReservation
}