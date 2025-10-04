import express from "express";
import auth from "../middleware/auth.js";
import Post from "../models/Post.js";

const router = express.Router();

// Create post
router.post("/", auth, async (req, res) => {
  try {
    const post = new Post({ ...req.body, author: req.user.id });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("author", "username");
  res.json(posts);
});

// Like post
router.put("/:id/like", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ msg: "Post not found" });

  if (post.likes.includes(req.user.id)) {
    post.likes.pull(req.user.id);
  } else {
    post.likes.push(req.user.id);
  }
  await post.save();
  res.json(post);
});

// Bookmark post
router.put("/:id/bookmark", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ msg: "Post not found" });

  if (post.bookmarks.includes(req.user.id)) {
    post.bookmarks.pull(req.user.id);
  } else {
    post.bookmarks.push(req.user.id);
  }
  await post.save();
  res.json(post);
});

export default router;
