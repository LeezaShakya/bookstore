import User from "../models/userModel.js";
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }
    const salt = await genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      username: req.body.username,
      password: hashPassword,
      email: req.body.email,
      role: req.body.role,
    });
    res.status(200).json({ msg: "Successfully Registered" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(req.body,"request")
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    //compare password
    const matchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!matchPassword) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    //creating access token, refresh token
    let payload = { id: user._id, username: user.username, email: user.email ,role: user.role };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10s", 
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "10m",
    });
    user.refreshToken = refreshToken
    await user.save();
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: true,
      maxAge: 20 * 1000 * 60 * 60 * 1000,
    });

    // const { password, ...details } = user.toObject();
    // details.token = token;

    res.status(200).json({ msg: "Successfully Logged In", accessToken, refreshToken,  user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const refresh = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies," cookies")
  if (!cookies?.jwt) return res.status(400);
  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      //any error during jwt verification
      if (err) return res.status(403).json({ message: "Forbidden" });
        
      //check if the user was deleted or token was tampered with
      const foundUser = await User.findOne({ username: decoded.username });
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      //create new access token
      let payload = { id: foundUser._id, username: foundUser.username, email: foundUser.email ,role: foundUser.role };
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).json({ accessToken });
    }
  );
};

export const logout = async (req,res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(204).json({ message : "No Content"})
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true
    })
    res.status(200).json({message: 'Cookie cleared'})
}