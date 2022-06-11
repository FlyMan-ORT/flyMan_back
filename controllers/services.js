var moment = require('moment');
const servicesDB = require('../data/services');

const createService = async (req, res) => {
    try {
        const { plate, reservationId } = req.body;
        if (!plate || !reservationId) return res.status(400).json({error: "No se pueden enviar campos vacíos."});
        const serviceExistant = await servicesDB.getService(plate, reservationId);
        if (serviceExistant) return res.status(400).json({error: "Servicio ya iniciado."});

        const service = {
            plate: plate,
            reservationId: reservationId,
            userEmail: '',
            startDate: moment().format(),
        }

        const saved = await servicesDB.saveService(service);
        if (!saved.insertedId) return res.status(500).json({error: "Ocurrió un error al iniciar el servicio. Inténtelo nuevamente."});

        res.status(200).json({ serviceId: saved.insertedId });
    } catch (error) {
        res.status(500).json({error: "Ocurrió un error al iniciar el servicio. Inténtelo nuevamente."});
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
        res.status(500).json({error: "Ocurrió un error al cargar los servicios. Inténtelo nuevamente."});
    }
}

const getService = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({error: "No se pueden enviar campos vacíos."});

        const service = await servicesDB.getService(id);
        if (!service) return res.status(404).json({error: "Servicio inexistente."});

        res.status(200).json({ service });
    } catch (error) {
        res.status(500).json({error: "Ocurrió un error al cargar el servicio. Inténtelo nuevamente."});
    }
}

const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { tasks } = req.body;
        if (!id || !tasks) return res.status(400).json({error: "No se pueden enviar campos vacíos."});

        const service = await getServiceById(id);
        if (!service) return res.status(404).json({error: "Servicio inexistente."});

        const endDate = moment().format();
        const updated = await servicesDB.updateService(id, tasks, endDate);;
        if (!updated || updated.modifiedCount === 0) return res.status(500).json({error: "Ocurrió un error al modificar el servicio. Inténtelo nuevamente."});

        res.status(200).json({ updated: updated.modifiedCount > 0 });
    } catch (error) {
        res.status(500).json({error: "Ocurrió un error al modificar el servicio. Inténtelo nuevamente."});
    }
}

module.exports = { createService, getService, updateService, getAllServices }