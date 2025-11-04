// routes/voiceRouter.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const voiceController = require("../controllers/voiceController");

const router = express.Router();

// Configure multer for audio uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".webm";
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// Render voice assistant UI
router.get("/", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.render("voice/voiceAssistant", {
    user: req.session.user,
    title: "🎤 ভয়েস চ্যাট - MonBondhu",
  });
});

// Handle voice upload
router.post("/chat", upload.single("audio"), voiceController.chatWithAI);

module.exports = router;
