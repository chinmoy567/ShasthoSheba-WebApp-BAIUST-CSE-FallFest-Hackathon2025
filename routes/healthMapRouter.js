const express = require("express");
const router = express.Router();
const { getFacilities, getFacilitiesJSON } = require("../controllers/healthMapController");

// Page route (renders map)
router.get("/", getFacilities);

// API route (for frontend JS fetch)
router.get("/data", getFacilitiesJSON);

module.exports = router;
