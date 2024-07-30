const User = require("../models/UserModel");
const { hashPassword, comparePassword } = require("../utils/auth");
const jwt = require("jsonwebtoken");

// register controller

const register = async (req, res) => {
  const { name, email, password, mobile, role } = req.body;
  try {
    // validation
    if (!name || !email || !password || !mobile || !role) {
      return res.status(401).send("please add all the fields");
    }
    //existig user
    const oldUser = await User.findOne({ email });
    if (oldUser) return res.status(400).send("User already exists");
    // hash the password before saving
    const hashedpassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedpassword,
      mobile,
      role,
    });
    return res.status(200).send({
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      message: "Something went wrong on server",
    });
  }
};

// login controller

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({ message: "invalid credentials" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "user is not registered" });
    }
    console.log(user);
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(400).send({ message: "invalid password" });
    }
    // generate token if both email and password are valid
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return res.status(201).send({
      message: "login successfull",
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      message: "Something went wrong on server while loggin",
    });
  }
};

module.exports = { register, login };
