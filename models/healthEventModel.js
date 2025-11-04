const mongoose = require("mongoose");

const healthEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ["Health Camp", "Blood Drive", "Awareness Session", "Vaccination"], default: "Health Camp" },
  date: { type: Date, required: true },
  time: String,
  location: String,
  organizer: String,
  contact: String,
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model("HealthEvent", healthEventSchema, "healthevents");
