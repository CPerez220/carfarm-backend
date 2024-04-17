const express = require("express");
const carsRouter = express.Router();
const { getAllCars, addCar, getAllUsersCar, deleteCar } = require("../db");
const { requireUser } = require("./require");

carsRouter.get("/", async (req, res) => {
  try {
    const cars = await getAllCars();

    res.send(cars);
  } catch (err) {
    res.sendStatus(500);
  }
});

carsRouter.get("/cars", requireUser, async (req, res) => {
  try {
    const cars = await getAllUsersCar(req.user.id);

    res.send(cars);
  } catch (err) {
    res.sendStatus(500);
  }
});

carsRouter.post("/", requireUser, async (req, res) => {
  try {
    const { year, brand, model, trim, imageURL, details, price } = req.body;
    const newlyCreatedCar = await createComic({
      year, brand, model, trim, imageURL, details, price,
      addedBy: req.user.id,
    });

    res.send(newlyCreatedCar);
  } catch (err) {
    res.sendStatus(500);
  }
});

carsRouter.delete("/:id", requireUser, async (req, res) => {
  try {
    const carId = req.params.id;
    const result = await deleteCar(carId);
    res.send(result);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = carsRouter;