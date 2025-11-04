// controllers/maternalVoiceController.js
const MaternalVoice = require("../models/maternalVoiceModel");
const dayjs = require("dayjs");

function generateSchedule(type, date) {
  const base = dayjs(date);
  let schedule = [];

  if (type === "mother") {
    schedule = [
      { name: "ANC Checkup 1", date: base.add(12, "week").toDate() },
      { name: "ANC Checkup 2", date: base.add(20, "week").toDate() },
      { name: "ANC Checkup 3", date: base.add(32, "week").toDate() },
      { name: "ANC Checkup 4", date: base.add(36, "week").toDate() },
    ];
  } else {
    schedule = [
      { name: "BCG + OPV-0", date: base.toDate() },
      { name: "Penta-1 + OPV-1", date: base.add(6, "week").toDate() },
      { name: "Penta-2 + OPV-2", date: base.add(10, "week").toDate() },
      { name: "Penta-3 + OPV-3", date: base.add(14, "week").toDate() },
      { name: "MR Vaccine", date: base.add(52, "week").toDate() },
    ];
  }

  return schedule;
}

exports.getVoiceInput = (req, res) => {
  res.render("maternalVoice/index", { user: req.session.user });
};

exports.postVoiceData = async (req, res) => {
  try {
    const { type, date } = req.body;
    const schedule = generateSchedule(type, date);

    const newRecord = new MaternalVoice({
      userId: req.session.user?._id,
      type,
      date,
      schedule,
    });

    await newRecord.save();
    res.redirect(`/dashboard/maternalvoice/schedule/${newRecord._id}`);
  } catch (err) {
    console.error("Error saving maternal voice data:", err);
    res.status(500).send("Server Error");
  }
};

exports.getSchedule = async (req, res) => {
  try {
    const tracker = await MaternalVoice.findById(req.params.id);
    res.render("maternalVoice/schedule", { tracker, user: req.session.user });
  } catch (err) {
    console.error("Error fetching schedule:", err);
    res.status(404).send("Not Found");
  }
};
