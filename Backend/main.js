require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.JWT_SECRET;

// Connect to MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User Schema & Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  mobile: { type: String, unique: true, required: true },
});
const User = mongoose.model("User", userSchema);

// 🔹 Register/Login API (Without Password)
app.post("/auth", async (req, res) => {
  const { username, mobile } = req.body;

  if (!mobile.match(/^[0-9]{10}$/)) {
    return res.status(400).json({ message: "Invalid mobile number!" });
  }

  try {
    let user = await User.findOne({ mobile });

    if (!user) {
      // Register new user
      user = new User({ username, mobile });
      await user.save();
    }

    // Generate JWT token for authentication
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful!", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Logout API (Client should handle token removal)
app.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully!" });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
