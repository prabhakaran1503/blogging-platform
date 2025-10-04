import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import Post from "../models/Post.js";

const router = express.Router();

// Middleware for admin only
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ msg: "Access denied" });
  next();
};

// Get all users
router.get("/users", auth, isAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Delete user
router.delete("/users/:id", auth, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "User deleted" });
});

// Delete post
router.delete("/posts/:id", auth, isAdmin, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ msg: "Post deleted" });
});

export default router;
