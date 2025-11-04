const HealthEvent = require("../models/healthEventModel");

// Render the page
exports.getEventsPage = async (req, res) => {
  try {
    const events = await HealthEvent.find().sort({ date: 1 });
    res.render("healthEvent/healthEventPage", {
      title: "Community Health Events",
      user: req.session.user,
      events,
    });
  } catch (err) {
    console.error("Error loading events:", err);
    res.status(500).send("Server error while loading events.");
  }
};

// API endpoint for JSON data (optional, for frontend fetch)
exports.getEventsJSON = async (req, res) => {
  try {
    const events = await HealthEvent.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
