const User = require("../models/userModel");
const mongoose = require("mongoose");
const { sendRes } = require("../helpers/sendRes");

module.exports.creatNewUser = async (req, res) => {
  try {
    const { username, password, confirmPassword, email, adress, role } =
      req.body;
    const createuser = await User.create({
      username,
      password,
      confirmPassword,
      email,
      adress,
      role,
    });
    sendRes(res, createuser, 201);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    sendRes(res, users, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) throw Error("user does not exist");
    sendRes(res, user, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.body;
    await User.findOneAndDelete(id);
    sendRes(res, "deleted successfully", 200);
  } catch (error) {
    sendRes(res, err, 400, true);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { id, username, email, adress } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { username, email, adress },
      {
        new: true,
        runValidators: true,
      }
    );
    sendRes(res, user, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.promotUser = async (req, res) => {
  const { id, role } = req.body;
  try {
    const roleuser = await User.findByIdAndUpdate(
      id,
      { role },
      {
        new: true,
        runValidators: true,
      }
    );
    sendRes(res, roleuser, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};
