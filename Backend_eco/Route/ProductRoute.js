const express = require("express");
const getAllRouter = require("../controller/Productcontroller.js");
const router = express.Router();

router.route("/products").get(getAllRouter);

module.exports = router;