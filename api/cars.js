const express = require('express');
const carsRouter = express.Router();
const { getAllCars, addCar, getAllUsersCar, deleteCar, createCar } = require('../db');
const { requireUser } = require('./require');

// Get all cars
carsRouter.get('/', async (req, res) => {
  try {
    const cars = await getAllCars();
    res.send(cars);
  } catch (err) {
    console.error('Error fetching cars:', err);
    res.sendStatus(500);
  }
});

// Get cars added by the current user
carsRouter.get('/cars', requireUser, async (req, res) => {
  try {
    const cars = await getAllUsersCar(req.user.id);
    res.send(cars);
  } catch (err) {
    console.error('Error fetching user cars:', err);
    res.sendStatus(500);
  }
});

// Add a new car
carsRouter.post('/', requireUser, async (req, res) => {
  try {
    const { year, brand, model, trim, imageURL, details, price } = req.body;
    const newlyCreatedCar = await createCar({
      year,
      brand,
      model,
      trim,
      imageURL,
      details,
      price,
      addedBy: req.user.id,
    });
    res.send(newlyCreatedCar);
  } catch (err) {
    console.error('Error creating a new car:', err);
    res.sendStatus(500);
  }
});

// Delete a car by ID
carsRouter.delete('/:id', requireUser, async (req, res) => {
  try {
    const carId = req.params.id;
    const result = await deleteCar(carId);
    res.send(result);
  } catch (err) {
    console.error('Error deleting car:', err);
    res.sendStatus(500);
  }
});

module.exports = carsRouter;