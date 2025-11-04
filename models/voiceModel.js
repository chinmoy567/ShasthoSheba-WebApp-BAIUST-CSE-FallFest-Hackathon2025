// models/voiceModel.js
const mongoose = require("mongoose");

const voiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  inputText: { type: String, required: true },
  aiResponse: { type: String, required: true },
  intent: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("VoiceInteraction", voiceSchema);
