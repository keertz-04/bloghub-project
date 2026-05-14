const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const authMiddleware = require("../middleware/auth");
const { validateBlogInput } = require("../utils/validators");

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Validation
    const errors = validateBlogInput(title, content, author);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors[0] });
    }

    const blog = new Blog({ 
      title: title.trim(),
      content: content.trim(),
      author: author.trim()
    });

    await blog.save();
    res.status(201).json({ 
      message: "Blog added successfully",
      blog 
    });
  } catch (error) {
    console.error("Add blog error:", error.message);
    res.status(500).json({ error: error.message || "Failed to add blog" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Blog.countDocuments();

    res.json({
      blogs,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    console.error("Get all blogs error:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch blogs" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid blog ID" });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    console.error("Get blog error:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch blog" });
  }
});

router.put("/edit/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid blog ID" });
    }

    // Validation
    const errors = validateBlogInput(title, content, author);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors[0] });
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { 
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ 
      message: "Blog updated successfully",
      blog 
    });
  } catch (error) {
    console.error("Edit blog error:", error.message);
    res.status(500).json({ error: error.message || "Failed to update blog" });
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid blog ID" });
    }

    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ 
      message: "Blog deleted successfully",
      blogId: req.params.id 
    });
  } catch (error) {
    console.error("Delete blog error:", error.message);
    res.status(500).json({ error: error.message || "Failed to delete blog" });
  }
});

module.exports = router;
