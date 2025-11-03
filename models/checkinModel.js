const mongoose = require("mongoose");

const checkinSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mood: { type: String, required: true },
  note: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Checkin", checkinSchema);
