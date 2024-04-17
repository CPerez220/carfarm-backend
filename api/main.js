const express = require('express');
const jwt = require('jsonwebtoken');
const {getUserById} = require('../db/index');
const apiRouter = express.Router();

apiRouter.use( async (req, res, next)=> {
  const prefix = "Bearer ";
  const auth = req.header('Authorization');

  if(!auth){
    next();
  }
  else if(auth.startsWith(prefix)){

    const token = auth.slice(prefix.length);

    const {id} = jwt.verify(token, process.env.JWT_SECRET);

    if(id){
      const user = await getUserById(id);
      req.user = {id: user.id, username: user.username};
      next();
    }else{
      next();
    }

  }
  else{
    next();
  }
})

apiRouter.get("/", (req, res)=> {
  res.send("This is the root for /api");
})

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const carsRouter = require('./cars');
apiRouter.use('/cars', carsRouter);

module.exports = apiRouter;