const express=require("express");
const { newOrder } = require("../controller/ordercontroller")
const { Authentication,AuthorizeRole } = require("../middleware/Authentication")
const router = express.Router();

router.route("/order/now").get(Authentication,newOrder)



module.exports=router;