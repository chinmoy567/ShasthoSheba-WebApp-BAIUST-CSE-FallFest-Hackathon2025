// routes/maternalVoiceRouter.js
const express = require("express");
const router = express.Router();
const maternalVoiceController = require("../controllers/maternalVoiceController");

router.get("/", maternalVoiceController.getVoiceInput);
router.post("/", maternalVoiceController.postVoiceData);
router.get("/schedule/:id", maternalVoiceController.getSchedule);

module.exports = router;
