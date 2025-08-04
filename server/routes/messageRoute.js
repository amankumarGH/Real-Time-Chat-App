import express from "express";
import {
  sendMessage,
  getMessage,
  deleteMessage,
} from "../controllers/message.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/send/:id", isAuthenticated, sendMessage);
router.get("/:id", isAuthenticated, getMessage);
router.delete("/:id", isAuthenticated, deleteMessage);

export default router;
