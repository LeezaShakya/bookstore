import User from "../models/userModel.js";
import bcrypt, { genSalt } from "bcrypt";

export const GetAllUser = async (req, res) => {
  try {
    let user = await User.find();
    if (!user) {
      return res.status(400).json({ error: "No Users Available" });
    }
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({
      msg: "Something went wrong",
      error: err.message,
    });
  }
};

export const GetUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    res.status(400).json({ data: user });
  } catch (err) {
    res.status(500).json({
      msg: "Something went wrong",
      error: err.message,
    });
  }
};

export const UpdateUsername = async (req, res) => {
  try {
    const duplicate = await User.findOne(req.body.username);

    // Allow updates to the original user
    if (duplicate) {
      return res.status(409).json({ message: "Duplicate username" });
    }

    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        username: req.body.username,
        image: req.body.image,
      },
      { new: true }
    );
    if (!user) {
      return res.status(400).json({ msg: "User Not Found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      msg: "Something went wrong",
      error: err.message,
    });
  }
};

export const ChangePassword = async (req, res) => {
  try {
    console.log(req.user, "---user");

    const { password, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    await user.save();
    return res.status(200).json({ message: "Successfully Changed Password" });
  } catch (err) {
    res.status(500).json({
      msg: "Something went wrong",
      error: err.message,
    });
  }
};
