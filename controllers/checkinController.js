const Checkin = require("../models/checkinModel");

const getCheckinDashboard = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/auth/login");
    }

    const checkins = await Checkin.find({ userId: req.session.user._id })
      .sort({ date: -1 })
      .limit(10);

    res.render("checkin/index", {
      title: "Mental Health Check-In",
      user: req.session.user,
      checkins,
    });
  } catch (error) {
    console.error("Error loading Check-In:", error);
    res.status(500).render("message", {
      title: "Server Error",
      message: "Something went wrong while loading check-ins.",
      backLink: "/dashboard",
    });
  }
};

const showNewCheckinForm = (req, res) => {
  if (!req.session.user) return res.redirect("/auth/login");
  res.render("checkin/new", {
    title: "New Check-In",
    user: req.session.user,
  });
};


const createCheckin = async (req, res) => {
  try {

    if (!req.session.user) return res.redirect("/auth/login");

    const { mood, note } = req.body;
    const checkin = await Checkin.create({
      userId: req.session.user._id,
      mood,
      note,
    });
    res.redirect("/dashboard/checkin");
  } catch (err) {
    console.error(" Error creating check-in:", err);
    res.status(500).render("message", {
      title: "Error",
      message: "Unable to save your check-in.",
      backLink: "/dashboard/checkin",
    });
  }
};




module.exports = { getCheckinDashboard, showNewCheckinForm, createCheckin };
