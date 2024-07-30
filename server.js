require("dotenv").config(); // dotenv configuration
const express = require("express");
const app = express();
const dbConnection = require("./config/dataBase");

const userRoutes = require("./routes/authRoute");

//middleware
app.use(express.json());

//routes
app.use("/api/auth", userRoutes);

PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send({ message: "welcome to ecommerce app" });
});

app.listen(PORT, () => {
  dbConnection().then(() => console.log(`server started at ${PORT}`));
});
