const OpenAI = require("openai");
const Checkin = require("../models/checkinModel"); // ✅ Import your Checkin model
require("dotenv").config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Render the chat page
const getChatPage = async (req, res) => {
  if (!req.session.user) return res.redirect("/auth/login");

  try {
    // 🔹 Find user's latest mood check-in
    const lastCheckin = await Checkin.findOne({ userId: req.session.user._id })
      .sort({ date: -1 })
      .lean();

    // Pass it to the frontend for GPT context
    res.render("chat/index", {
      title: "AI Chat Companion",
      user: req.session.user,
      lastCheckin, // send the data
    });
  } catch (err) {
    console.error("Error fetching last check-in:", err);
    res.render("chat/index", {
      title: "AI Chat Companion",
      user: req.session.user,
      lastCheckin: null,
    });
  }
};

// ✅ Handle chat message
const postChatMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // Get last mood context again (optional, if you want GPT to recall mid-chat)
    const lastCheckin = await Checkin.findOne({ userId: req.session.user._id })
      .sort({ date: -1 })
      .lean();

    const systemPrompt = lastCheckin
      ? `You are ShasthoSheba, a warm, empathetic AI companion. 
        The user's last mood was "${lastCheckin.mood}" and note: "${lastCheckin.note}".
        Start by checking in emotionally before answering. 
        Never diagnose, just comfort and guide softly.`
      : `You are ShasthoSheba, a kind and empathetic AI companion.
         The user has no previous check-ins yet. Start warmly.`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    res.json({
      reply:
        "😔 Sorry, I’m having trouble responding right now. Please try again later.",
    });
  }
};

module.exports = { getChatPage, postChatMessage };
