const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    
    if (!mongoUrl) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }

    await mongoose.connect(mongoUrl);

    console.log("✓ MongoDB Connected Successfully");
    
    // Handle connection events
    mongoose.connection.on("disconnected", () => {
      console.log("⚠ MongoDB Disconnected");
    });

    mongoose.connection.on("error", (error) => {
      console.error("✗ MongoDB Connection Error:", error.message);
    });

  } catch (error) {
    console.error("✗ MongoDB Connection Failed:", error.message);
    // Don't exit process - allow app to run in demo mode
    console.log("⚠ Running in demo mode without database");
  }
};

module.exports = connectDB;