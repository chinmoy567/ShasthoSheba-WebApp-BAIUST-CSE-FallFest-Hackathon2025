const express = require("express");
const router = express.Router();


const {
  getCheckinDashboard,
  showNewCheckinForm,
  createCheckin,
} = require("../controllers/checkinController");

router.get("/", getCheckinDashboard);      
router.get("/new", showNewCheckinForm);     
router.post("/new", createCheckin);

module.exports = router;
