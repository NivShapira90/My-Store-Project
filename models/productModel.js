const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required!"],
      unique: true,
      trim: true,
      maxlenght: 50,
    },

    brand: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "vegan cheese",
        "tofu",
        "supplements",
        "frozen fruits",
        "frozen ice creams",
        "veagn Substitutes",
      ],
    },

    description: {
      type: String,
      required: true,
    },

    weight: {
      type: String,
      required: true,
      max: 50,
      min: 1,
    },

    ingredients: {
      type: [String], // i need to use array of strings to organize the strings in the database
      required: true,
    },

    image: {
      type: [String], // array of strings for images
      default: [
        "https://www.google.com/search?q=image&sxsrf=ALiCzsawXTuDSjO86LhkcPkgtXS0H1bbWA:1661356773611&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjkg9ii7N_5AhXVxgIHHfn-BXEQ_AUoAXoECAEQAw&biw=1536&bih=754&dpr=1.25#imgrc=ez-ubljHwN9MSM",
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("reviews", {
  localField: "_id", // the field in productmodel i want to to associate
  foreignField: "product", // associate to "product" key in reviewModel
  ref: "reviews",
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
