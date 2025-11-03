// routes/chatRouter.js
const express = require("express");
const router = express.Router();
const {
  getChatPage,
  postChatMessage,
} = require("../controllers/chatController");

router.get("/", getChatPage);
router.post("/", postChatMessage);

module.exports = router;
