const mongoose = require("mongoose");
const { isEmail } = require("validator");

const formSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },

  name: {
    type: String,
    required: [true, "you must enter name"],
    minlength: 2,
  },

  email: {
    type: String,
    unique: [true, "you must enter an email"],
    minlength: [6, "please provide non empty email "],
    maxlength: [50, "too long email adress"],
    validate: [isEmail, "invalid email"],
  },
  phone: {
    type: Number,
    required: true,
    min: 10,
  },

  subject: {
    type: String,
    required: true,
    minlength: [2, "please provide subject "],
    maxlength: [30, "subject title cannot be longer than 20 letters"],
  },

  message: {
    type: String,
  },
});

const Form = mongoose.model("forms", formSchema);
module.exports = Form;
