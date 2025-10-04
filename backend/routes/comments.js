import express from "express";
import auth from "../middleware/auth.js";
import Comment from "../models/Comment.js";

const router = express.Router();

// Add comment
router.post("/:postId", auth, async (req, res) => {
  const { content } = req.body;
  try {
    const comment = new Comment({
      post: req.params.postId,
      author: req.user.id,
      content
    });
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get comments by post
router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate("author", "username");
  res.json(comments);
});

export default router;
