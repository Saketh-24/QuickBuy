require("dotenv").config(); // dotenv configuration
const express = require("express");
const app = express();
const dbConnection = require("./config/dataBase");
const cors = require("cors");

const userRoutes = require("./routes/authRoute");
const adminRoutes = require("./routes/AdminRoute");

//middleware
app.use(express.json());
app.use(cors()); // CROSS ORIGIN ERROR

//routes
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send({ message: "welcome to ecommerce app" });
});

app.listen(PORT, () => {
  dbConnection().then(() => console.log(`server started at ${PORT}`));
});
