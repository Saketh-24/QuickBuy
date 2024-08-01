const User = require("../../models/UserModel");

const getUsersList = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select(
      "-password"
    );
    if (users) {
      return res.status(200).send({ success: true, users });
    } else {
      return res
        .status(200)
        .send({ success: false, message: "no users found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong on server" });
  }
};

module.exports = getUsersList;
