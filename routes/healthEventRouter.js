const express = require("express");
const router = express.Router();
const { getEventsPage, getEventsJSON } = require("../controllers/healthEventController");

router.get("/", getEventsPage);
router.get("/data", getEventsJSON);

module.exports = router;
