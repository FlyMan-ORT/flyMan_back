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

const createReservation = async (req, res) => {
    try {
        let { car, employeeMail, reservationDay, reservationTime } = req.body;
        if (!car || !employeeMail || !reservationDay || !reservationTime) return res.status(400).json();

        const user = await usersDB.getUserByEmail(employeeMail);
        if (!user) return res.status(400).json();

        const splitDate = reservationDay.split("-")
        const year = parseInt(splitDate[0]);
        const month = parseInt(splitDate[1]) - 1; // hay que restarle uno para que lo guarde bien
        const day = parseInt(splitDate[2]);
        const splitTime = reservationTime.split(":")
        const hour = parseInt(splitTime[0]);
        const minutes = parseInt(splitTime[1]);

        // Create the correct date format
        const newStartTime = new Date(year, month, day, hour, minutes);
        // Add 1 hour to the startTime
        let endTime = new Date(newStartTime);
        endTime.setHours(newStartTime.getHours() + 1);
        
        // Actualmente guarda los horarios con UTC a pedido de Gero, es decir 3hs más de las que hay en Arg
        const reservation = {
            "status": "RESERVED",
            "startTime": newStartTime.toISOString().replace(/\..+/, ''),
            "endTime": endTime.toISOString().replace(/\..+/, ''),
            "startParkingName": "",
            "billingStatus": "ON_HOLD",
            "fuelStart": 0.0,
            "endFuel": null,
            "car": car,
            "user": {
                "email": employeeMail
            },
            "createdAt": new Date().toISOString().replace(/\..+/, ''),
            "bookingType": "MAINTENANCE"
        }       
        
        let saved = await reservationsDB.createReservation(reservation);
        if (!saved.insertedId) return res.status(500).json({ error: 'Error' });

        res.status(200).json(saved.insertedId);
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
}


module.exports = {
    getAllReservationsByUser,
    getAllReservations,
    getReservationById,
    createReservation
}