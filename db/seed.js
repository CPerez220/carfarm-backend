const client = require('./client');
const { addCar } = require('./available');

const dropTables = async() => {
  try {
    await client.query(`
    DROP TABLE IF EXISTS available
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
    )
    `)
  } catch(error) {
    console.log(error);
  }
}

const configuracion = async() => {
  await client.connect();
  console.log("CONNECTED");

  await dropTables();
  console.log("DROPPED TABLES");

  await createTables();
  console.log("CREATED TABLES");

  await addCar("2021", "Ford", "F-150", "Raptor", "URL", "Good condition truck", "100000");

  await client.end();
  console.log("DISCONNECTED");
}

configuracion();