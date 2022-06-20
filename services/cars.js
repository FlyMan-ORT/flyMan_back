const carsDB = require('../data/cars');

const updateLastServiceDate = async (plate, date) => {
    try {
        const updated = carsDB.updateLastServiceDate(plate, date);
        return (updated && updated.modifiedCount > 0);
    } catch (error) {
        return false;
    }
}

module.exports = { updateLastServiceDate };