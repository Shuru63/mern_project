const express = require("express");
const { newOrder,
    myOrder,
    getSingleOrder,
    getAllOrder,
    updateOrder,
    deleteOrder} = require("../controller/ordercontroller")
const { Authentication, AuthorizeRole } = require("../middleware/Authentication")
const router = express.Router();

router.route("/order/now").get(Authentication, newOrder);
router.route("/myorder:id").get(Authentication, getSingleOrder);
router.route("/myorder").get(Authentication, myOrder);
router.route("/getallorder").get(Authentication,AuthorizeRole("admin"), getAllOrder)
router.route("/getallorder:id").put(Authentication,AuthorizeRole("admin"), updateOrder).delete(Authentication,AuthorizeRole("admin"), deleteOrder);
module.exports = router;
