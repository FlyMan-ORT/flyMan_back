const carsDB = require('../data/cars');

const getAllCars = async (req, res) => {
    let cars = await cars.getAllCars();
    res.status(200).json(cars);
}

module.exports = { getAllCars }