const express = require("express");
const router = express.Router();

router.post("/analyze", (req, res) => {
  const { image } = req.body;

  if (!image) return res.status(400).json({ error: "No image provided" });

  // Mock AI calculations
  const protein = Math.round(Math.random() * 40 + 10);
  const carbs = Math.round(Math.random() * 80 + 10);
  const fats = Math.round(Math.random() * 30 + 5);
  const calories = protein * 4 + carbs * 4 + fats * 9;

  res.json({ protein, carbs, fats, calories });
});

router.post("/chat", async (req, res) => {
  const { message, user_id } = req.body;

  if (!message) return res.status(400).json({ error: "No message provided" });

  try {
    const AIService = require("../services/aiService");
    // In a real app, we would fetch userContext from DB here
    const aiResponse = await AIService.chatWithCoach(message);
    res.json(aiResponse);
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

module.exports = router;
