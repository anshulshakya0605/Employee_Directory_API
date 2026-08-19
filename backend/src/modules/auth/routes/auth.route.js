import express from "express"
import { changePassword, forgotPassword, loginUser, registerUser, resetPassword } from "../controller/auth.controller.js";
import authenticate from "../../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)
router.patch("/change-password", authenticate, changePassword)

export default router;