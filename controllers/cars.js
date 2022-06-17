const carsDB = require('../data/cars');

const getAllCars = async (req, res) => {
    try {
        const cars = await carsDB.getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({error: "Ocurrió un error al cargar los autos. Inténtelo nuevamente."});
    }
}

const openCar = async (req, res) => {
    try {
        const { plate } = req.params;
        if (!plate) return res.status(400).json({ error: "Ocurrió un error al abrir el auto. Inténtelo nuevamente." });

        const car = await carsDB.getCarByPlate(plate);
        if (!car) return res.status(404).json({ error: "Auto inexistente." });
        
        res.status(200).send(true);
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al abrir el auto. Inténtelo nuevamente." });
    }
}

const closeCar = async (req, res) => {
    try {
        const { plate } = req.params;
        if (!plate) return res.status(400).json({ error: "Ocurrió un error al cerrar el auto. Inténtelo nuevamente." });

        const car = await carsDB.getCarByPlate(plate);
        if (!car) return res.status(404).json({ error: "Auto inexistente." });

        res.status(200).send(true);
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al cerrar el auto. Inténtelo nuevamente." });
    }
}

module.exports = { getAllCars, openCar, closeCar }