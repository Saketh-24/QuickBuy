const User = require("../../models/UserModel");
const { hashPassword } = require("../../utils/auth");

const updateProfile = async (req, res) => {
  try {
    const { name, email, mobile, address, password } = req.body;
    const user = await User.findById(req.user.id);
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.password,
        mobile: mobile || user.mobile,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};

module.exports = { updateProfile };
