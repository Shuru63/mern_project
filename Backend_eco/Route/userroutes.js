const express = require("express");
const { createUser,
    Loginuser,
    Logout,
    Forgetpassword,
    resetPassword,
    profile,
    updateprofilepassword,
    updateProfileid,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser } = require("../controller/userController");
const { Authentication, AuthorizeRole } = require("../middleware/Authentication")


const router = express.Router();

router.route("/register").post(createUser);
router.route("/loginuser").post(Loginuser);
router.route("/password/forget").post(Forgetpassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/profile").get(Authentication, profile)
router.route("/profile/password/update").put(Authentication, updateprofilepassword)
router.route("/profile/updateProfileid").put(Authentication, updateProfileid)
router.route("/admin/user").get(Authentication, AuthorizeRole("admin"), getAllUser);
router.route("/admin/user:id").get(Authentication, AuthorizeRole("admin"), getSingleUser)
    .put(Authentication, AuthorizeRole("admin"), updateUserRole)
    .delete(Authentication, AuthorizeRole("admin"), deleteUser);
router.route("/logoutuser").get(Logout);

module.exports = router;

