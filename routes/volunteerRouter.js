const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");

// ✅ Routes
router.get("/", volunteerController.getVolunteers);
router.get("/add", volunteerController.renderAddForm);
router.post("/add", volunteerController.addVolunteer);

module.exports = router;
