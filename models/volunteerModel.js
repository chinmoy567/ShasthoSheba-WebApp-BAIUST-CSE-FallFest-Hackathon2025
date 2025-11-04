const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  village: { type: String, required: true },
  union: { type: String, required: true },
  upazila: { type: String },
  district: { type: String },
  skills: { type: [String], required: true },
  contact: { type: String, required: true },
  availableHours: { type: String, default: "9 AM - 5 PM" },
  trainedBy: { type: String },
  verified: { type: Boolean, default: false }
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
