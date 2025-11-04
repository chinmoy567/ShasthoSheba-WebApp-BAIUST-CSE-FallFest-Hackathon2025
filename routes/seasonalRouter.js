// routes/seasonalRouter.js
const express = require("express");
const router = express.Router();
const { getSeasonalPage, getSeasonalJSON } = require("../controllers/seasonalController");

// Page route
router.get("/", getSeasonalPage);

// API route (optional)
router.get("/data", getSeasonalJSON);

module.exports = router;
