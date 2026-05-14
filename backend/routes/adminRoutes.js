const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateEmail, validatePassword } = require("../utils/validators");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);
    const admin = new Admin({ 
      name: name.trim(), 
      email: email.toLowerCase(), 
      password: hash 
    });

    await admin.save();
    res.status(201).json({ 
      message: "Admin registered successfully",
      adminId: admin._id 
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ error: error.message || "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Find admin
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select("+password");
    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check password
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || "bloghubsecret", { 
      expiresIn: "30d" 
    });

    res.json({ 
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: error.message || "Login failed" });
  }
});

module.exports = router;