const express = require('express');

// Controller & Logics Location
const userController = require('../controllers/userController');
const { googleOauth } = require('../helpers/googleOauth');


// Create an instance of an Express Router
const userRouter = express.Router();

// Create a new user
userRouter.post('/register', userController.createUser);

// Log in user
userRouter.post('/login', userController.loginUser);

// Register with google account
userRouter.get('/google', googleOauth);

module.exports = userRouter;