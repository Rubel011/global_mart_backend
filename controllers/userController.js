const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const colors = require("colors");
require("dotenv").config();

const { userModel } = require("../models/userModel");
const { sendSms } = require("../helpers/sendingOtpPhone");
const { sendEmail } = require("../helpers/sendingEmails");
const { generateOTPforPhone } = require("../helpers/phoneOtpHelper");
const { generateOTPforMail } = require("../helpers/mailOtpHelper");

var mailOtp, phoneOtp, jwt_normal_token, jwt_refresh_token;

exports.createUser = async (req, res) => {
  const { name, email, password, imageUrl, contactNumber } = req.body;
  try {
    const userExist = await userModel.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Error in hashing password",
      });
    }

    const userData = new userModel({
      name,
      email,
      password: hashedPassword,
      imageUrl,
      contactNumber
    });
    await userData.save();

    // Send Welcome Note through email
    const emailData = {
      email: userData.email,
      subject: "Welcome to Globalmart !",
      body: `
                  <html>
                    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                      <h2>Welcome to Globalmart ${name} !</h2>
                      <p>Thank you for Registering with Globalmart</h3>
                      <p>Globalmart is a cutting-edge e-commerce platform built with React.js and Node.js. Experience seamless shopping with advanced features including secure user authentication, product browsing, intuitive cart management, and streamlined payment processing. Elevate your online shopping experience with Globalmart today.</p>
                      <p>Happy Exploring!</p>
                      <p>Best regards,</p>
                      <p>The Globalmart Team</p>
                      <a href="https://localhost:8080/api/auth/login">Now Proceed for Login</a>
                    </body>
                  </html>
                `,
    };
    sendEmail(emailData);

    return res.status(201).json({
      status: 201,
      success: true,
      message: "Registration successful",
      data: userData,
    });
  } catch (error) {
    console.error(colors.red("Error: ", error.message));
    res.status(500).json({ status: 500, error: "Registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const SECRET_KEY = process.env.SECRET_KEY_NORMAL;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: 401,
        success: false,
        error: "Invalid credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: 401,
        success: false,
        error: "Invalid credentials",
      });
    }

    // Generating Normal Token Here
    const normalToken = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "7d",
    });
    jwt_normal_token = normalToken;

    // Generating Refresh Token Here
    const refreshToken = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "24d",
    });
    jwt_refresh_token = refreshToken;

    // OTP Section
    const otpMail = generateOTPforMail();
    mailOtp = otpMail;

    const otpPhone = generateOTPforPhone();
    phoneOtp = otpPhone;

    const emailData = {
      email: user.email,
      subject: "Welcome to Globalmart - Login OTP",
      body: `
              <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                  <h2>Welcome to Globalmart ${user.name} !</h2>
                  <p>Thank you for Login with Globalmart. Please use the following OTP to complete your further process:</p>
                  <h3>${otpMail}</h3>
                  <p>Do not share this OTP with anyone.</p>
                  <p>Happy Exploring!</p>
                  <p>Best regards,</p>
                  <p>The Globalmart Team</p>
                  <a href="http://localhost:8080/api/check/otp">Now Proceed for OTP Verification</a>
                </body>
              </html>
            `,
    };
    sendEmail(emailData);

    // Send OTP through SMS
    const smsData = {
      toPhoneNumber: user.contactNumber,
      message: `Welcome to Globalmart ${user.name}! Please use the following OTP to complete your registration: ${otpPhone} . Do not share this OTP with anyone.`,
    };
    sendSms(smsData);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error(colors.red("Error: ", error.message));
    res.status(500).json({
      status: 500,
      success: false,
      error: "Login failed",
    });
  }
};

// Check otp is valid or not 
exports.otpContainer = () => {
  var arrayOfOTP = [];

  arrayOfOTP.push(mailOtp, phoneOtp, jwt_normal_token, jwt_refresh_token);

  return arrayOfOTP;
};