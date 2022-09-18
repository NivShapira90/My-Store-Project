const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlenght: 20,
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },

    creatAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },

    stars: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },

    reviewer: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },

    product: {
      type: mongoose.Schema.ObjectId,
      ref: "products",
    },
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/find/, function (next) {
  this.populate({
    path: "reviewer",
    select: "username email",
  });
  next();
});

const Review = mongoose.model("reviews", reviewSchema);
module.exports = Review;
