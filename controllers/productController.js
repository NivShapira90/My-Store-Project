const Product = require("../models/productModel");
const { sendRes } = require("../helpers/sendRes");
const { makeFilterObject } = require("../helpers/makeFilterObject");
const { default: mongoose } = require("mongoose");

module.exports.createNewProduct = async (req, res) => {
  try {
    const {
      brand,
      name,
      price,
      category,
      description,
      weight,
      ingredients,
      image,
    } = req.body;
    const newProduct = await Product.create({
      brand,
      name,
      price,
      category,
      description,
      weight,
      ingredients,
      image,
    });
    sendRes(res, newProduct, 201);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    sendRes(res, {}, 204);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.getAllProducts = async (req, res) => {
  const filterObject = makeFilterObject(req.query);
  try {
    const products = await Product.find(filterObject);
    sendRes(res, products, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};
module.exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("reviews");
    console.log(product);
    if (!product) {
      throw new Error("id does not exist");
    }
    sendRes(res, product, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.checkVaildId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = { message: "invalid id" };
    sendRes(res, error, 400, true);
    return;
  }
  next();
};

module.exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    const products = await Product.find({ category: "veagn Substitutes" });
    products.forEach((pr) => {
      pr.price = 1;
      pr.save({ runValidators: true });
    });
    sendRes(res, product, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};
