const express = require("express");

const ordersRoute = require("../controllers/ordersController");

const router = express.Router();

router
  .route("/")
  .post(ordersRoute.createNewOrder)
  .get(ordersRoute.getOrdersByUser);

router.route("/:date").get(ordersRoute.getOrdresByDate);

module.exports = router;
