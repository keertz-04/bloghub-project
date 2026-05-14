const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog title is required"],
    trim: true,
    minlength: [5, "Title must be at least 5 characters"],
    maxlength: [200, "Title cannot exceed 200 characters"]
  },
  content: {
    type: String,
    required: [true, "Blog content is required"],
    minlength: [20, "Content must be at least 20 characters"]
  },
  author: {
    type: String,
    required: [true, "Author name is required"],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Blog", blogSchema);