const axios = require("axios");
const Symptom = require("../models/symptomModel");
require("dotenv").config();

// Render the symptom awareness page
const getSymptomPage = async (req, res) => {
  if (!req.session.user) return res.redirect("/auth/login");

  const userId = req.session.user._id;
  const history = await Symptom.find({ userId })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  res.render("symptom/index", {
    title: "Symptom Awareness Guide",
    user: req.session.user,
    history,
  });
};

// Analyze user input via AI (using OpenAI API)
const analyzeSymptom = async (req, res) => {
  const { message } = req.body;
  const userId = req.session.user?._id;

  // 🔒 Validate environment key
  if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY in .env file");
    return res.json({
      reply: "⚠️ সার্ভারের সেটআপে সমস্যা আছে। অনুগ্রহ করে পরে চেষ্টা করুন।",
    });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
              তুমি একজন স্বাস্থ্য শিক্ষিকা সহকারী।
              কোনো রোগের নাম বা ওষুধ বলবে না।
              শুধুমাত্র মানুষকে শেখাও কখন উপসর্গ বিপজ্জনক হতে পারে, কীভাবে সচেতন থাকতে হবে, এবং কখন ডাক্তার দেখাতে হবে।
              বাংলায় সহজ, উষ্ণ ও আশ্বাসমূলকভাবে উত্তর দাও।
            `,
          },
          { role: "user", content: message },
        ],
        temperature: 0.6,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    const reply =
      response.data?.choices?.[0]?.message?.content ||
      " বর্তমানে সাড়া পাওয়া যাচ্ছে না। পরে চেষ্টা করুন।";

    await Symptom.create({ userId, symptomText: message, aiResponse: reply });
    res.json({ reply });
  } catch (err) {
    console.error(" Error analyzing symptom:", err.message);
    res.json({
      reply:
        " দুঃখিত, আমি এখন আপনার অনুরোধটি বিশ্লেষণ করতে পারছি না। অনুগ্রহ করে পরে চেষ্টা করুন।",
    });
  }
};

module.exports = { getSymptomPage, analyzeSymptom };
