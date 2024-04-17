const express = require("express");
const client  = require("./db/client");
const apiRouter = require('./api/main');

const app = express();
const PORT = 8080;

client.connect();

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});