const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },

  status: {
    type: String,
    default: "pending",
  },

  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "products",
        required: true,
      },
      amount: {
        type: Number,
        required: true,
        min: 1,
        validate: {
          validator: function (val) {
            val = String(val);
            return !val.includes(".");
          },
        },
        required: true,
      },
    },
  ],
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
