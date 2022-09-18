const mongoose = require("mongoose");
const { sendRes } = require("../helpers/sendRes");
const Form = require("../models/formModel");

module.exports.createNewForm = async (req, res) => {
  try {
    const { name, email, phone, subject } = req.body;
    const form = await Form.create({ name, email, phone, subject });
    sendRes(res, form, 201);
  } catch (err) {
    sendRes(res, err, 401, true);
  }
};
