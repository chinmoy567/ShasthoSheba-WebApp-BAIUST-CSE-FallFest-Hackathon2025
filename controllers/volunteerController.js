const fs = require("fs");
const path = require("path");
const Volunteer = require("../models/volunteerModel");

//  Fetch and filter volunteers by village, union, upazila, district, skill
const getVolunteers = async (req, res) => {
  try {
    const { district, skill } = req.query;
    const query = {};

    if (district && district.trim() !== "")
      query.district = { $regex: district.trim(), $options: "i" };

    if (skill && skill.trim() !== "")
      query.skills = { $regex: skill.trim(), $options: "i" };

    const volunteers = await Volunteer.find(query);
    res.render("volunteer/index", { volunteers, query: req.query });
  } catch (err) {
    console.error("Error fetching volunteers:", err);
    res.status(500).send("Server Error");
  }
};

//  Render the Add Volunteer form
const renderAddForm = (req, res) => {
  res.render("volunteer/add");
};

// Add a new volunteer to MongoDB
const addVolunteer = async (req, res) => {
  try {
    const {
      name,
      village,
      union,
      upazila,
      district,
      skills,
      contact,
      availableHours,
      trainedBy
    } = req.body;

    const newVolunteer = new Volunteer({
      name,
      village,
      union,
      upazila,
      district,
      skills: skills.split(",").map((s) => s.trim()),
      contact,
      availableHours,
      trainedBy
    });

    await newVolunteer.save();
    res.redirect("/dashboard/volunteer");
  } catch (err) {
    console.error("Error adding volunteer:", err);
    res.status(500).send("Failed to add volunteer");
  }
};

// Seed initial 100 volunteers from JSON file
const seedVolunteers = async () => {
  const count = await Volunteer.countDocuments();
  if (count === 0) {
    const dataPath = path.join(__dirname, "../data/volunteers.json");
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    await Volunteer.insertMany(data);
    console.log(" Volunteer data seeded (100 records)");
  }
};

module.exports = {
  getVolunteers,
  renderAddForm,
  addVolunteer,
  seedVolunteers
};
