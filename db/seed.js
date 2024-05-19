const client = require('./client');
const { addCar, createUser } = require('./index');
const bcrypt = require('bcrypt');

const dropTables = async () => {
  try {
    await client.query('DROP TABLE IF EXISTS available');
    await client.query('DROP TABLE IF EXISTS users');
  } catch (error) {
    console.error('Error dropping tables:', error);
  }
};

const createTables = async () => {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS available (
        id SERIAL PRIMARY KEY,
        year INTEGER NOT NULL,
        brand VARCHAR(25) NOT NULL,
        model VARCHAR(25),
        trim VARCHAR(25),
        imageURL TEXT,
        details TEXT NOT NULL,
        price INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

const createUsers = async () => {
  try {
    await createUser('Carlos', await bcrypt.hash('Contrasena', 10));
    await createUser('Manuel', await bcrypt.hash('02022022', 10));
    await createUser('Juan', await bcrypt.hash('Pedro22', 10));
  } catch (error) {
    console.error('Error creating users:', error);
  }
};

const configureDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to the database');

    await dropTables();
    console.log('Dropped existing tables');

    await createTables();
    console.log('Created tables');

    await addCar('2021', 'Ford', 'F-150', 'Raptor', 'URL', 'Good condition truck', 100000);
    console.log('Added cars');

    await createUsers();
    console.log('Created users');
  } catch (error) {
    console.error('Error configuring database:', error);
  } finally {
    await client.end();
    console.log('Disconnected from the database');
  }
};

configureDatabase();