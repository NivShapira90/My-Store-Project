const mongoose = require("mongoose");
const { sendRes } = require("../helpers/sendRes");
const Order = require("../models/ordersModel");

module.exports.createNewOrder = async (req, res) => {
  try {
    const { user, products } = req.body;
    const order = await Order.create({
      user,
      products,
    });
    sendRes(res, order, 201);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.getOrdersByUser = async (req, res) => {
  try {
    const { id } = req.query;
    let orderuser = await Order.find({ user: id })
      .populate({
        path: "user",
        select: "adress, -_id",
      })
      .populate({
        path: "products", // populate inside products model
        populate: {
          path: "product",
          select: "name price category",
        },
      })
      .lean();
    orderuser = orderuser.map((order) => {
      order.totalPrice = order.products.reduce(
        (prev, curr) => prev + curr.product.price * curr.amount,
        0
      );
      return orderuser;
    });
    sendRes(res, orderuser, 201);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.getOrdresByDate = async (req, res) => {
  try {
    const { id } = req.query;
    const orderdate = await Order.find({
      id: {
        date: { $eq: new Date("2022-09-05T00:00:00Z") },
      },
    });
    console.log(orderdate);
    sendRes(res, orderdate, 201);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
  0;
};
