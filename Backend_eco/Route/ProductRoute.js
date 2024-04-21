const express = require("express");
const { getAllRouter,
    createProduct,
    updateproduct,
    deleteProduct,
    getProductDetails } = require("../controller/Productcontroller.js");
const router = express.Router();

router.route("/products").get(getAllRouter);
router.route("/products/new").post(createProduct);
router.route("/products/:id").put(updateproduct);
router.route("/products/:id").delete(deleteProduct);
router.route("/products/:id").get(getProductDetails);



module.exports = router;