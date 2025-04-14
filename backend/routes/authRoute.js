const {
  registerUser,
  loginUser,
  request,
  resetPassword,
} = require("../controllers/authController");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router.route("/register").post(catchAsync(registerUser));
router.route("/login").post(catchAsync(loginUser));
router.route("/request").post(request);
router.route("/reset-password").post(resetPassword);

module.exports = router;
