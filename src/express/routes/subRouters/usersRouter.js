const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUserByEmail } = require('../../db/dbMethods/usersMethods');
const {requireUser} = require('../utils')

usersRouter.use((req, res, next) => {
  console.log("A request is being mad to /users");
  next();
});

usersRouter.post("/login", requireUser, async (req, res, next) => {
  const {email, password } =req.body;

  if(!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please provide both email and password"
    })
    return
  };

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      next({
        name: "IncorrectCredentialsError",
        message: "Email or Password is incorrect"
      });
    };

    const hashed = user.password
    const matched = await bcrypt.compare(password, hashed);

    if (matched) {
      const token = jwt.sign(user, process.env.JWT_SECRET);
      delete user.password;
      res.send({user, token, message: "You're Logged In!"});
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});