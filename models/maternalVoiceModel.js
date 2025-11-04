// models/maternalVoiceModel.js
const mongoose = require("mongoose");

const maternalVoiceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["mother", "child"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  schedule: [
    {
      name: String,
      date: Date,
      done: { type: Boolean, default: false },
      note: String,
    },
  ],
});

module.exports = mongoose.model("MaternalVoice", maternalVoiceSchema);
