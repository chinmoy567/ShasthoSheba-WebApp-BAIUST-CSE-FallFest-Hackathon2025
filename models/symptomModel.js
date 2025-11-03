const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  symptomText: { type: String, required: true },
  aiResponse: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Symptom", symptomSchema);
