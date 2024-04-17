const express = require("express");
const bcrypt = require("bcrypt");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { client } = require("../db/client");
const { createUser } = require("../db/index")

const signToken = (username, id) => {
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1w",
  });
  return token;
};

usersRouter.get("/", (req, res) => {
  res.send("This is the root for /api/users");
});

usersRouter.post("/login", async (req, res) => {
  const username = req.body.username;
  const plainTextPassword = req.body.password;
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE username = $1
    `,
      [username]
    );

    if (!user) {
      res.sendStatus(401);
    } else {
      const passwordIsAMatch = await bcrypt.compare(
        plainTextPassword,
        user.password
      );
      if (passwordIsAMatch) {
        const token = signToken(user.username, user.id);
        res.send({ message: "Succesfully Logged in", token });
      } else {
        res.sendStatus(401);
      }
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

usersRouter.post("/register", async (req, res) => {
  const username = req.body.username;
  const plainTextPassword = req.body.password;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

  try {
    const user = createUser(username, hashedPassword);

    const token = signToken(user.username, user.id);

    res.send({ message: "Successful Registration", token });
  } catch (err) {
    console.log("Error creating user", err);
    res.sendStatus(500);
  }
});

module.exports = usersRouter;