require("dotenv").config(); // dotenv configuration
const express = require("express");
const app = express();
const dbConnection = require("./config/dataBase");
const cors = require("cors");

const authRoutes = require("./routes/authRoute");
const adminRoutes = require("./routes/AdminRoute");
const userRoutes = require("./routes/UserRoute");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // CROSS ORIGIN ERROR

//routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send({ message: "welcome to ecommerce app" });
});

app.listen(PORT, () => {
  dbConnection().then(() => console.log(`server started at ${PORT}`));
});
