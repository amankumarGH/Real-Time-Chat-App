import express from "express";
import {
  getOtherUsers,
  login,
  logout,
  removeUser,
  signup,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/", isAuthenticated, getOtherUsers);
router.delete("/remove/:username",removeUser);

export default router;
