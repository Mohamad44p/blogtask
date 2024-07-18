import express from "express";
const router = express.Router();
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postControllers.js";

router.post("/create", createPost);
router.get("/all", getAllPosts);
router.get("/:id", getPostById);
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

export default router;
