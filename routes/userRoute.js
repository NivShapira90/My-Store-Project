const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .post(userController.creatNewUser)
  .get(userController.getAllUsers);

router.route("/promote").put(userController.promotUser);

router
  .route("/:id")
  .get(userController.getUserById)
  .delete(userController.deleteUserById)
  .put(userController.updateUser);

module.exports = router;
