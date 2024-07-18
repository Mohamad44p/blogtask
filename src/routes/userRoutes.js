import express from "express";
const router = express.Router();
import {
  Register,
  Login,
  getAllUsers,
  deleteUser,
} from "../controllers/userControllers.js";

router.post("/register", Register);
router.post("/login", Login);
router.get("/all", getAllUsers);
router.delete("/delete/:id", deleteUser);

export default router;
