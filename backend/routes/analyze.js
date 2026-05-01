const express = require("express");
const router = express.Router();

router.post("/analyze", async (req, res) => {
  const { image } = req.body;

  if (!image) return res.status(400).json({ error: "No image provided" });

  try {
    const AIService = require("../services/aiService");
    const result = await AIService.analyzeMeal(image);

    res.json({
      protein: result.macros.protein,
      carbs: result.macros.carbs,
      fats: result.macros.fats,
      calories: result.estimatedCalories,
      foodName: result.foodName
    });

  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: "AI Analysis failed" });
  }
});

router.post("/chat", async (req, res) => {
  const { message, user_id } = req.body;

  if (!message) return res.status(400).json({ error: "No message provided" });

  try {
    const AIService = require("../services/aiService");
    // In a real app, we would fetch userContext from DB here
    const aiResponse = await AIService.chatWithCoach(message);
    res.json({ reply: aiResponse });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});



router.post("/body-analyze", async (req, res) => {
  const { image } = req.body;
  if (!image) return res.status(400).json({ error: "No image provided" });

  try {
    const AIService = require("../services/aiService");
    const result = await AIService.analyzeBody(image);
    res.json(result);
  } catch (error) {
    console.error("Body Scan Error:", error);
    res.status(500).json({ error: "Body Analysis failed" });
  }
});

module.exports = router;
