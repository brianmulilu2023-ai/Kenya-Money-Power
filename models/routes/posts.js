const express = require("express");
const router = express.Router();
const Post = require("../post");

// CREATE POST
router.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);
    const saved = await post.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET FEATURED POSTS
router.get("/featured", async (req, res) => {
  try {
    const posts = await Post.find({ featured: true }).sort({ createdAt: -1 }).limit(3);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET LATEST POSTS
router.get("/latest", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(6);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET BY CATEGORY
router.get("/category/:name", async (req, res) => {
  try {
    const posts = await Post.find({ category: req.params.name }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SEARCH POSTS
router.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET SINGLE POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Post not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;