const express = require("express");

const reviewController = require("../controllers/reviewController");

const router = express.Router();

router.route("/").delete(reviewController.deleteReviewById);

router
  .route("/:productId")
  .all(reviewController.checkIfProductExist)
  .post(reviewController.createNewreview);

module.exports = router;
