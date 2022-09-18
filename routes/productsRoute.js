const express = require("express");

const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createNewProduct);

router
  .route("/:id")
  .all(productController.checkVaildId)
  .get(productController.getProductById)
  .delete(productController.deleteProductById);
module.exports = router;
