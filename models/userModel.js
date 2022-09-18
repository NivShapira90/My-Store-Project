const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    maxlenght: [20, "name can't be longer than 20 characters"],
  },

  password: {
    type: String,
    trim: true,
    required: true,
    minlenght: [12, "min lenght is 12"],
    maxlenght: [30, "max lenght 30"],
    select: false,
  },

  confirmPassword: {
    type: String,
    trim: true,
    required: true,
    minlenght: [12, "min lenght is 12"],
    maxlenght: [200, "max lenght 200"],
    select: false,
    validate: {
      validator: function (confirmPassword) {
        return confirmPassword === this.password;
      },
    },
  },

  email: {
    type: String,
    trim: true,
    unique: [true, "you must enter an email"],
    min: [6, "please provide non empty email "],
    max: [50, "too long email adress"],
    validate: [isEmail, "invalid email"],
  },

  birhtdate: {},

  active: {
    type: Boolean,
    default: true,
  },

  role: {
    type: String,
    required: true,
    enum: ["buyer", "editor", "admin"],
    default: "buyer",
  },

  adress: {
    type: String,
    required: true,
    trim: true,
  },

  reviews: {
    type: mongoose.Schema.ObjectId,
    ref: "reviews",
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hash = await bcrypt.hash(this.password, 11);
  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (rawPassword) {
  return await bcrypt.compare(rawPassword, this.password);
};

const User = mongoose.model("users", UserSchema);
module.exports = User;
