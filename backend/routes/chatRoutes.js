const express = require("express");
const router = express.Router();

const { sendMessage, getConversation } = require("../controllers/chatController");

router.post("/send", sendMessage);
router.get("/:user_id/:trainer_id", getConversation);

module.exports = router;
