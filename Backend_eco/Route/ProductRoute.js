const express = require("express");
const { getAllRouter,
    createProduct,
    updateproduct,
    deleteProduct,
    getProductDetails } = require("../controller/Productcontroller.js");
    const isAuthentication=require("../middleware/Authentication")
const router = express.Router();

router.route("/products").get(getAllRouter);
router.route("/products/new").post(isAuthentication,createProduct);
router.route("/products/:id").put(isAuthentication,updateproduct);
router.route("/products/:id").delete(isAuthentication,deleteProduct);
router.route("/products/:id").get(getProductDetails);



module.exports = router;