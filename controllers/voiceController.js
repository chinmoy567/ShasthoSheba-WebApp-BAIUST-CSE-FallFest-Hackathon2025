// controllers/voiceController.js
const OpenAI = require("openai");
const fs = require("fs");
const Voice = require("../models/voiceModel");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.chatWithAI = async (req, res) => {
  try {
    const { userId, history } = req.body;
    const audioFile = req.file;

    if (!audioFile) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    // 1️⃣ Transcribe Bangla (auto-detect)
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioFile.path),
      model: "whisper-1",
    });

    const userSpeech = transcription.text?.trim() || "শব্দ শোনা যায়নি।";

    // 2️⃣ Build chat messages
    const messages = [
      {
        role: "system",
        content:
          "তুমি একজন বন্ধুসুলভ স্বাস্থ্য সহকারী — মনবন্ধু। সহজ বাংলায়, সংক্ষিপ্ত ও সহানুভূতিশীল উত্তর দাও।",
      },
      ...JSON.parse(history || "[]"),
      { role: "user", content: userSpeech },
    ];

    // 3️⃣ Generate AI reply
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });
    const aiText = completion.choices[0].message.content.trim();

    // 4️⃣ Generate Bangla voice reply
    const tts = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: aiText,
    });
    const audioBuffer = Buffer.from(await tts.arrayBuffer());

    // 5️⃣ Save to MongoDB
    await Voice.create({
      userId,
      inputText: userSpeech,
      aiResponse: aiText,
    });

    // 6️⃣ Return to client
    res.json({
      userSpeech,
      aiText,
      audio: audioBuffer.toString("base64"),
    });
  } catch (err) {
    console.error("ChatVoice Error:", err);
    res.status(500).json({ error: err.message });
  }
};
