// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const connectDB = require("./db");
const WasteRequest = require("./models/WasteRequest"); // MongoDB model

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '_' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG, PNG & GIF files are allowed."));
    }
  }
});


// ============================================
// ✅ ROUTES
// ============================================

// Get all waste requests (with role-based filtering)
app.get("/api/waste-requests", async (req, res) => {
  try {
    const { role } = req.query; // Get user role from query parameter
    
    let query = {};
    
    // NGO can only see Food Waste and Cloth Waste
    if (role === 'ngo') {
      query = {
        wasteCategory: { $in: ['Food Waste', 'Cloth Waste'] }
      };
    }
    // Admin and Recycler can see all requests
    // Household can see all (for viewing their own posts)
    
    const requests = await WasteRequest.find(query).sort({ _id: -1 });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching waste requests:", error);
    res.status(500).json({ error: "Failed to fetch waste requests" });
  }
});

// Submit a waste request (only Household can post)
app.post("/api/waste-requests", upload.single("image"), async (req, res) => {
  try {
    const { wasteType, wasteCategory, quantity, location, postedBy } = req.body;

    if (!wasteType || !wasteCategory || !quantity || !location) {
      return res.status(400).json({ error: "Please fill in all required fields" });
    }

    if (quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be greater than 0" });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const newRequest = new WasteRequest({
      wasteType,
      wasteCategory,
      quantity,
      location,
      image: imagePath,
      status: "Pending Pickup",
      postedBy: postedBy || null
    });

    await newRequest.save();

    res.json({
      success: true,
      message: "Waste request submitted successfully",
      data: newRequest
    });

  } catch (error) {
    console.error("Error submitting waste request:", error);
    res.status(500).json({ error: "Failed to submit waste request" });
  }
});

// Update status
app.put("/api/waste-requests/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await WasteRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.json({
      success: true,
      message: "Status updated successfully",
      data: updated
    });

  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
});

// Test API
app.get("/", (req, res) => {
  res.send("Waste Smart API Running (MongoDB)");
});


// ============================================
// Start Server
// ============================================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
