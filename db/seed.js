const client = require('./client');
const { addCar, createUser } = require(`./index`);
const bcrypt = require("bcrypt");

const dropTables = async() => {
  try {
    await client.query(`
    DROP TABLE IF EXISTS available
    `)
    await client.query(`
    DROP TABLE IF EXISTS users
    `)
  } catch(error) {
    console.log(error);
  }
}

const createTables = async() => {
  try {
    await client.query(`
    CREATE TABLE available (
      id SERIAL PRIMARY KEY,
      year INTEGER NOT NULL,
      brand VARCHAR(25) NOT NULL,
      model VARCHAR(25),
      trim VARCHAR(25),
      imageURL TEXT,
      details TEXT NOT NULL,
      price INTEGER NOT NULL
    );

    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL

    );
    `)
  } catch(error) {
    console.log(error);
  }
}

const createUsers = async () => {
  try {
    const Carlos = await createUser("Carlos", await bcrypt.hash("Contrasena", 10));
    const Manuel = await createUser("Manuel", await bcrypt.hash("02022022", 10));
    const Juan = await createUser("Juan", await bcrypt.hash("Pedro22", 10));
  } catch (error) {
    console.log(error);
  }
};

const configuracion = async() => {
  await client.connect();
  console.log("CONNECTED");

  await dropTables();
  console.log("DROPPED TABLES");

  await createTables();
  console.log("CREATED TABLES");

  await addCar("2021", "Ford", "F-150", "Raptor", "URL", "Good condition truck", "100000");
  console.log("ADDED CARS");

  await createUsers();
  console.log("CREATED USERS");

  await client.end();
  console.log("DISCONNECTED");
}

configuracion();