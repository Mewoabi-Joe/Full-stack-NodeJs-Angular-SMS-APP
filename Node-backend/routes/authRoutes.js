const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.post("/verify_email", authController.sendEmailToResetPassword);
router.post("/reset_password", authController.resetPassword);
// router.get("/logout", authController.logout_get);

module.exports = router;
