import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  handleGetMessages,
  handleGetUsers,
  handleSendMessages,
} from "../controllers/messageControllers.js";

const router = express.Router();

router.get("/users", handleGetUsers);
router.post("/getmsgs", handleGetMessages);
router.post("/send", handleSendMessages);
export default router;
