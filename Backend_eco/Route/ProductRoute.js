const express = require("express");
const { getAllRouter,
    createProduct,
    updateproduct,
    deleteProduct,
    getProductDetails,
    userReview,
    getallreview,
    deleteReview } = require("../controller/Productcontroller.js");

const { Authentication,AuthorizeRole } = require("../middleware/Authentication")
const router = express.Router();

router.route("/products").get(getAllRouter);
router.route("/admin/products/new").post(Authentication,AuthorizeRole("admin"), createProduct);
router.route("/admin/products/:id").put(Authentication,AuthorizeRole("admin"), updateproduct);
router.route("/admin/products/:id").delete(Authentication,AuthorizeRole("admin"), deleteProduct);
router.route("/products/:id").get(getProductDetails);
router.route("/review").put(Authentication,userReview)
router.route("/allreview").put(Authentication,userReview).get(getallreview).delete(Authentication , deleteReview)

module.exports = router;