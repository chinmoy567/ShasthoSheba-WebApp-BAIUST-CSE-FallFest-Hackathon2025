const mongoose = require("mongoose");

const healthFacilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },   // Clinic, Hospital, Pharmacy, etc.
  division: String,
  district: String,
  upazila: String,
  union: String,
  address: String,
  contact: String,
  hours: String,
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});


module.exports = mongoose.model("HealthFacility", healthFacilitySchema, "healthfacilities");
