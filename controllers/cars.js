const carsDB = require('../data/cars');

const getAllCars = async (req, res) => {
    try {
        const cars = await cars.getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json();
    }
}

module.exports = { getAllCars }