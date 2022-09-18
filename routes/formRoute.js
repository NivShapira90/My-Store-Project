const express = require("express");

const formRoute = require("../controllers/formController");

const router = express.Router();

router.route("/").post(formRoute.createNewForm);

module.exports = router;
