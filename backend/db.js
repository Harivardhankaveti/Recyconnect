// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/wasteconnect");

    console.log("MongoDB connected successfully!");
    return true;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    return false;
  }
};

module.exports = connectDB;
