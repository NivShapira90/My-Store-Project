const User = require("../models/userModel");
const { sendRes } = require("../helpers/sendRes");
const jwt = require("jsonwebtoken");

const signJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, adress } = req.body;
    const user = await User.create({
      username,
      email,
      password,
      confirmPassword,
      adress,
    });
    const token = signJWT(user._id);
    res.cookie("jwt", token, {
      secure: process.env.ENVIRONMENT !== "development",
      httpOnly: process.env.ENVIRONMENT !== "development",
    });
    sendRes(res, user, 201);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password)))
      throw new Error("invaild credentials");
    const token = signJWT(user._id);
    res.cookie("jwt", token, {
      secure: process.env.ENVIRONMENT !== "development",
      httpOnly: process.env.ENVIRONMENT !== "development",
    });
    sendRes(res, user, 201);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.authenticateUser = async (req, res, next) => {
  try {
    const { jwt } = req.cookies;
    if (!token) throw new Error("please login to continue");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (Date.now() > decoded.exp) throw new error("login expired");
    const user = await User.findById(decoded.id);
    if (!user) throw new Error("invalid user");

    throw new Error("login expired, please login again");
  } catch (error) {
    sendRes(res, err, 403, true);
    return;
  }
  next();
};
