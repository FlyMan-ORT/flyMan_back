var moment = require('moment');
const servicesDB = require('../data/services');
const reservationsService = require('../services/reservations');
const carsService = require('../services/cars');

const createService = async (req, res) => {
    try {
        const { plate, reservationId, carImage } = req.body;

        if (!plate || !reservationId || !carImage) return res.status(400).json({ error: "No se pueden enviar campos vacíos." });

        // Chequear si tiene una reserva activa
        // Chequear si tiene un servicio no finalizado?

        const serviceExistant = await servicesDB.getServiceByPlateAndReservation(plate, reservationId);
        if (serviceExistant) return res.status(400).json({ error: "Servicio ya iniciado." });

        const { email } = req.user;

        const service = {
            plate: plate,
            carImage: carImage,
            reservationId: reservationId,
            userEmail: email,
            startDate: moment.utc().format(),
        }

        const saved = await servicesDB.saveService(service);
        if (!saved.insertedId) return res.status(500).json({ error: "Ocurrió un error al iniciar el servicio. Inténtelo nuevamente." });

        await reservationsService.startReservation(reservationId);

        res.status(200).json({ serviceId: saved.insertedId });
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al iniciar el servicio. Inténtelo nuevamente." });
    }
}

const getAllServices = async (req, res) => {
    try {
        const ended = req.query.ended;
        let services = [];
        if (ended === 'true') {
            services = await servicesDB.getEndedServices();
        } else {
            services = await servicesDB.getAllServices();
        }

        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al cargar los servicios. Inténtelo nuevamente." });
    }
}

const getService = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: "No se pueden enviar campos vacíos." });

        const service = await servicesDB.getService(id);
        if (!service) return res.status(404).json({ error: "Servicio inexistente." });

        res.status(200).json({ service });
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al cargar el servicio. Inténtelo nuevamente." });
    }
}

const getServiceByPlateAndReservation = async (req, res) => {
    try {
        const { plate, reservationId } = req.params;
        if (!plate || !reservationId) return res.status(400).json();

        const service = await servicesDB.getServiceByPlateAndReservation(plate, reservationId);
        if (!service) return res.status(404).json();

        res.status(200).json(service);
    } catch (error) {
        res.status(500).json();
    }
}

const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { tasks, damage, tires, securityKit, documents, cleanliness, fuel } = req.body;

        if (
            !id
            || !tasks
            || !validateService.damage(damage)
            || !validateService.tires(tires)
            || !validateService.securityKit(securityKit)
            || !validateService.documents(documents)
            || !validateService.cleanliness(cleanliness)
            || !validateService.fuel(fuel)
        ) return res.status(400).json();

        const service = await servicesDB.getService(id);
        if (!service) return res.status(404).json();

        const endDate = moment.utc().format();

        const updated = await servicesDB.updateService(id, req.body, endDate);
        if (!updated || updated.modifiedCount === 0) return res.status(500).json();

        await reservationsService.finishReservation(service.reservationId);

        await carsService.updateLastServiceDate(service.plate, endDate);

        res.status(200).json({ updated: updated.modifiedCount > 0 });
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al modificar el servicio. Inténtelo nuevamente." });
    }
}

const validateService = {
    damage: (damage) => {
        if (!damage) return false;
        const { isDamaged, damageDescription } = damage;
        if (isDamaged === undefined || isDamaged === null) return false;
        if (damageDescription === undefined || damageDescription === null) return false;
        return true;
    },
    tires: (tires) => {
        if (tires === undefined || tires === null) return false;
        return true;
    },
    securityKit: (securityKit) => {
        if (securityKit === undefined || securityKit === null) return false;
        return true;
    },
    documents: (documents) => {
        if (documents === undefined || documents === null) return false;
        return true;
    },
    cleanliness: (cleanliness) => {
        if (!cleanliness) return false;
        if (typeof cleanliness !== 'number') return false;
        return true;
    },
    fuel: (fuel) => {
        if (!fuel) return false;
        const { fuelLoad, fuelPrice } = fuel;
        if (fuelLoad === undefined || fuelLoad === null) return false;
        if (fuelPrice === undefined || fuelPrice === null) return false;
        if (typeof fuelPrice !== 'number') return false;
        return true;
    }
}

module.exports = { createService, getService, getServiceByPlateAndReservation, updateService, getAllServices };