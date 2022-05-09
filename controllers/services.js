var moment = require('moment-timezone');
const ServicesDB = require('../data/services');

const saveService = async (plate, reservationId) => {
    const service = {
        plate: plate,
        reservationId: reservationId,
        userEmail: '',
        startDate: moment.utc().tz("America/Argentina/Buenos_Aires").format(),
    }

    const result = await ServicesDB.saveService(service);

    return result;
}

const getService = async (plate, reservationId) => {
    return await ServicesDB.getService(plate, reservationId);
}

const getServiceById = async (id) => {
    return await ServicesDB.getServiceById(id);
}

const updateService = async (id, tasks) => {
    const endDate = moment.utc().tz("America/Argentina/Buenos_Aires").format();
    return await ServicesDB.updateService(id, tasks, endDate);
}

module.exports = { saveService, getService, getServiceById, updateService }