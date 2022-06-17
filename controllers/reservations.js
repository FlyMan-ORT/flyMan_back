const reservationsDB = require('../data/reservations');
const reservationsService = require('../services/reservations');
const usersDB = require('../data/users');
const carsDB = require('../data/cars');
const dateUtils = require('../utils/dateUtil');
const moment = require('moment')

const getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationsDB.getAllReservations();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al cargar las reservas. Inténtelo nuevamente." });
    }
}

const getAllReservationsByUser = async (req, res) => {
    try {
        const { email } = req.user;
        const reservations = await reservationsDB.getAllReservationsByEmail(email);
        const filteredReservations = reservations.filter((r) => moment().isSame(r.startTime, 'day') &&
            r.bookingType == "MAINTENANCE" &&
            (r.status == "RESERVED" || r.status == "ACTIVE"))

        res.status(200).json(filteredReservations);
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al cargar las reservas. Inténtelo nuevamente." });
    }
}

const createReservation = async (req, res) => {
    try {
        const { plate, mail, day, time } = req.body;
        if (!plate || !mail || !day || !time) return res.status(400).json({ error: "No se pueden enviar campos vacíos." });

        const user = await usersDB.getUserByEmail(mail);
        if (!user) return res.status(400).json({ error: "Usuario inexistente." });

        const car = await carsDB.getCarByPlate(plate);
        if (!car) return res.status(400).json({ error: "Auto inexistente." });

        // Create the correct date format
        const startTime = moment(`${day} ${time}`).utc();
        // Add 1 hour to the startTime
        const endTime = moment(startTime).add(1, 'hours').utc();

        if (startTime.isBefore(moment())) return res.status(400).json({ error: "No se puede hacer una reserva en una hora pasada." });

        const userReservations = await reservationsDB.getAllReservationsByEmail(mail);
        const userOcuppied = userReservations.some((r) => startTime.isSame(r.startTime, 'day')
            && dateUtils.isBetween(startTime, endTime, r.startTime, r.endTime, undefined)
            && r.bookingType == "MAINTENANCE"
            && (r.status == "RESERVED" || r.status == "ACTIVE" || r.status == "COMPLETE"))

        if (userOcuppied) return res.status(400).json({ error: "Este operario esta ocupado a esta hora." });

        const carReservations = await reservationsDB.getReservationsByPlate(plate);
        const isReserved = carReservations.some((r) => startTime.isSame(r.startTime, 'day')
            && dateUtils.isBetween(startTime, endTime, r.startTime, r.endTime, undefined)
            && (r.status == "RESERVED" || r.status == "ACTIVE" || r.status == "COMPLETE"))

        if (isReserved) return res.status(400).json({ error: "Este auto ya tiene una reserva a esta hora." });

        // Actualmente guarda los horarios con UTC a pedido del cliente, es decir 3hs más de las que hay en Arg
        const reservation = {
            "status": "RESERVED",
            "startTime": startTime.format(),
            "endTime": endTime.format(),
            "startParkingName": "",
            "billingStatus": "ON_HOLD",
            "fuelStart": 0.0,
            "endFuel": null,
            "car": car,
            "user": {
                "email": mail
            },
            "createdAt": moment.utc().format(),
            "bookingType": "MAINTENANCE"
        }

        let saved = await reservationsDB.createReservation(reservation);
        if (!saved.insertedId) return res.status(500).json({ error: "Ocurrió un error al crear la reserva. Inténtelo nuevamente." });

        res.status(200).json(saved.insertedId);
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al crear la reserva. Inténtelo nuevamente." });
    }
}

const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: "Ocurrió un error al cancelar la reserva. Inténtelo nuevamente." });

        const reservation = await reservationsDB.getReservationById(id);
        if (!reservation) return res.status(400).json({ error: "Reserva inexistente." });

        if (reservation.status == "ACTIVE") return res.status(400).json({ error: "No se puede cancelar una reserva activa." });
        if (reservation.status == "COMPLETE") return res.status(400).json({ error: "No se puede cancelar una reserva finalizada." });
        if (reservation.status == "CANCELLED") return res.status(400).json({ error: "Esta reserva ya fue candelada anteriormente." });

        const isPast = moment().isAfter(reservation.startTime);
        if (isPast) return res.status(400).json({ error: "No se puede eliminar una reserva pasada." });

        const isModified = await reservationsService.cancelReservation(id);
        if (!isModified) return res.status(500).json({ error: "Ocurrió un error al cancelar la reserva. Inténtelo nuevamente." });

        res.status(200).json(isModified);
    } catch (error) {
        return res.status(500).json({ error: "Ocurrió un error al cancelar la reserva. Inténtelo nuevamente." });
    }
}

module.exports = {
    getAllReservationsByUser,
    getAllReservations,
    createReservation,
    deleteReservation,
}