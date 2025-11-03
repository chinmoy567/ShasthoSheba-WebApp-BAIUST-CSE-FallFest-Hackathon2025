const express = require("express");
const router = express.Router();
const {
  getSymptomPage,
  analyzeSymptom,
} = require("../controllers/symptomController");

// GET: /dashboard/symptom
router.get("/", getSymptomPage);

// POST: /dashboard/symptom/analyze
router.post("/analyze", analyzeSymptom);

module.exports = router;
