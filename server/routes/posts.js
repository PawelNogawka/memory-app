import express from "express";

import { getPosts } from "../controllers/posts.js";

import { getPost } from "../controllers/posts.js";
import { getUserPosts } from "../controllers/posts.js";
import { getPostsBySearch } from "../controllers/posts.js";
import { createPost } from "../controllers/posts.js";
import { likePost } from "../controllers/posts.js";
import { commentPost } from "../controllers/posts.js";
import { updatePost } from "../controllers/posts.js";
import { deletePost } from "../controllers/posts.js";

const router = express.Router();

import auth from "../middleware/auth.js";

router.get("/", getPosts);
router.get("/userPosts/:userId", getUserPosts);
router.get("/:id", getPost);
router.get("/search/:searchQuery?/:tags?", getPostsBySearch);
router.post("/", auth, createPost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

export default router;
