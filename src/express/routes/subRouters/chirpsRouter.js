const express = require('express');
const chirpsRouter = express.Router();
const {getAllChirps} = require('../../db/dbMethods/chirpsMethods');

chirpsRouter.use((req, res, next) => {
  console.log("A Request is being made to /chirps");
  next();
});

chirpsRouter.get("/", async (req, res, next) => {
  
  try {
    
    const chirps = getAllChirps();
    res.send(chirps);

  } catch (error) {
     console.error(error);
     next(error);
  }
})

module.exports = chirpsRouter;