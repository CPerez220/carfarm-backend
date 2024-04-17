const client = require('./client.js');

const getUserById = async (id) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users 
    WHERE id=$1;
  `,
      [id]
    );
    return user;
  } catch (err) {
    throw err;
  }
};

const createUser = async (username, password) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    RETURNING *;
    `,
      [username, password]
    );

    return user;
  } catch (err) {
    throw err;
  }
};

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

const getAllCars = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM available;
    `);

    return rows;
  } catch (err) {
    throw err;
  }
};

const deleteCar = async (carId) => {
  try{
    const {rows: [available]} = await client.query( 
      `
        DELETE FROM available
        WHERE id=${carId}
        RETURNING *;
      `
    )
    return available;
  }
  catch(err){
    throw err;
  }
}

const getAllUsersCar = async (userId) => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM available WHERE addedBy=${userId};
    `);

    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  addCar,
  getAllCars,
  getUserById,
  getAllUsersCar,
  deleteCar
};