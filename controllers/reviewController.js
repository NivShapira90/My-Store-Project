const Review = require("../models/reviewModel");
const mongoose = require("mongoose");
const Product = require("../models/productModel"); // importing product model to check if the product exist
const { sendRes } = require("../helpers/sendRes");

module.exports.checkIfProductExist = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) throw new Error("product does not exist"); // this is middleware that checks if the product exist
    req.product = product;
  } catch (err) {
    sendRes(res, err, 400, true);
  }
  next();
};

module.exports.createNewreview = async (req, res) => {
  try {
    const { title, reviewer, description, stars } = req.body;
    const review = await Review.create({
      title,
      description,
      stars,
      reviewer,
      product: req.params.productId,
    });
    sendRes(res, review, 201);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
      throw new Error("id does not exist");
    }
    sendRes(res, review, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.deleteReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const dreview = await Review.deleteOne({ _id: id });
    sendRes(res, dreview, 204);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};
