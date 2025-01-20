import express from "express";
import {
  handleCheckAuth,
  handleLogin,
  handleLogout,
  handleSignup,
  handleUpdateProfile,
  handleMainUser,
} from "../controllers/authController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.get("/:id", handleMainUser);
////unused
router.post("/logout", handleLogout);

router.put("/updateProfile", protectRoute, handleUpdateProfile);
router.get("/check", protectRoute, handleCheckAuth);

export default router;
