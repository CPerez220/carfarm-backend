const client = require('./client.js');

const addCar = async (carYear, carBrand, carModel, carTrim, carImage, carDetails, carPrice) => {
  try {
    await client.query(`
      INSERT INTO available (year, brand, model, trim, imageURL, details, price)
      VALUES ($1, $2, $3, $4, $5, $6, $7);
    `, [carYear, carBrand, carModel, carTrim, carImage, carDetails, carPrice]);
  } catch (err) {
    console.error('Error inserting car:', err);
  }
};

module.exports = {
  addCar
};