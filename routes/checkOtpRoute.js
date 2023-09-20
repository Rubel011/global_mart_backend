const express = require('express');
const checkOtpController = require('../controllers/checkOtpController');


// Create an instance of an Express Router
const otpRouter = express.Router();

// Create a new user
otpRouter.post('/otp', checkOtpController.checkOtp);

module.exports = otpRouter;