const express = require("express");
const { createUser
    , Loginuser,Logout } = require("../controller/userController");



const router = express.Router();

router.route("/register").post(createUser);
router.route("/loginuser").post(Loginuser)
router.route("/logoutuser").get(Logout)

module.exports = router;

