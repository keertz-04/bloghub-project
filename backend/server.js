require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/blog", blogRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));