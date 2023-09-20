const express = require("express");
const cors = require("cors");
const colors = require("colors");
const swaggerUI = require("swagger-ui-express");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// --------------->>>>>>>> Locations <<<<<<<<-------------------
// Configs Location
const { connectToDatabase } = require("./configs/db");

// Routers Location
const userRouter = require("./routes/userRoute");
const otpRouter = require("./routes/checkOtpRoute");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
// const cartRouter = require("./routes/cartRoute");
// const orderRouter = require("./routes/orderRoute");


// Middleware Location
const { authenticateToken } = require("./middlewares/auth_middleware");
const specs = require("./configs/swaggerConfig");

// Middlewares
app.use(express.json());
app.use(cors());

// Set the view engine to EJS
app.set("view engine", "ejs");


app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

// Home route
app.get("/", (req, res) => {
  res.render("home/home");
});

// Routes (API Endpoints)
app.use("/api/auth", userRouter);
app.use("/api/check", otpRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);

// Middleware for token authentication (applies to the routes below)
// app.use(authenticateToken);

// app.use("/api/cart", cartRouter);
// app.use("/api/orders", orderRouter);

// Server Listening
(async () => {
  try {
    await connectToDatabase();

    // Start Server
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`.blue);
    });
  } catch (error) {
    console.error(colors.red(`Database connection error:`, error.message));
  }
})();
