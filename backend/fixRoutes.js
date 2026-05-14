const fs = require('fs');

const blogRoutes = `const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

router.post("/add", async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.json("Blog Added");
});

router.get("/all", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

router.put("/edit/:id", async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body);
  res.json("Blog Updated");
});

router.delete("/delete/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json("Blog Deleted");
});

module.exports = router;
`;

const adminRoutes = `const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const admin = new Admin({ name, email, password: hash });
  await admin.save();
  res.json("Admin Registered");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin) return res.status(400).json("Admin not found");

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(400).json("Invalid Password");

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || "bloghubsecret");
  res.json({ token });
});

module.exports = router;
`;

fs.writeFileSync('routes/blogRoutes.js', blogRoutes, 'utf8');
fs.writeFileSync('routes/adminRoutes.js', adminRoutes, 'utf8');
console.log('Routes fixed');
