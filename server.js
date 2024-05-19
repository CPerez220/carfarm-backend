const express = require('express');
const client = require('./db/client');
const apiRouter = require('./api/main');

const app = express();
const PORT = 8080;

const startServer = async () => {
  try {
    await client.connect();
    console.log('Connected to the database');

    app.use('/api', apiRouter);

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();