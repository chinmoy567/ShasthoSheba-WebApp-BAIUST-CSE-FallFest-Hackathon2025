const HealthFacility = require("../models/healthFacilityModel");

// ✅ Render the main health map page
exports.getFacilities = async (req, res) => {
  try {
    const facilities = await HealthFacility.find();
    res.render("healthMap/healthMap", {
      title: "Community Health Map",
      facilities,
    });
  } catch (err) {
    console.error("❌ Error fetching facilities:", err);
    res.status(500).send("Server Error");
  }
};

// ✅ API endpoint that returns facilities sorted by proximity
exports.getFacilitiesJSON = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    let facilities = await HealthFacility.find();

    // If location provided, sort by distance
    if (lat && lon) {
      const userLat = parseFloat(lat);
      const userLon = parseFloat(lon);

      facilities = facilities.sort((a, b) => {
        const dA = Math.hypot(a.latitude - userLat, a.longitude - userLon);
        const dB = Math.hypot(b.latitude - userLat, b.longitude - userLon);
        return dA - dB;
      });
    }

    res.json(facilities);
  } catch (err) {
    console.error("❌ Error fetching facilities JSON:", err);
    res.status(500).json({ error: err.message });
  }
};
