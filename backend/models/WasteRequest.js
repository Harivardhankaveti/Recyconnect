const mongoose = require("mongoose");

const WasteRequestSchema = new mongoose.Schema({
  wasteType: { type: String, required: true },
  wasteCategory: { 
    type: String, 
    required: true,
    enum: ['Food Waste', 'Cloth Waste', 'Plastic', 'Glass', 'Metal', 'Electronic', 'Paper', 'Other'],
    default: 'Other'
  },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String },
  status: { type: String, default: "Pending Pickup" },
  postedBy: { type: String }, // User ID who posted the request
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("WasteRequest", WasteRequestSchema);
