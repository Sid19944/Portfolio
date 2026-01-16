import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateProfile,
  updatePassword,
  refreshAccessToken,
  getUserForPortfolio,
  SendForgotPasswordLink,
  setNewForgotPassword,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser); //
router.route("/login").post(loginUser); //
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/me").get(getUser); //
router.route("/update/me").put(verifyJWT, updateProfile); //
router.route("/update/password").put(verifyJWT, updatePassword); //
router.route("/refreshAccessToken").post(refreshAccessToken);

router.route("/me/portfolio").get(getUserForPortfolio);

// forgot password
router.route("/forgot/password").post(SendForgotPasswordLink); //
router.route("/forgot/password/:resetToken").put(setNewForgotPassword); //

export default router;
