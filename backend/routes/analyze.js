const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const AIService = require("../services/aiService");
const StorageService = require("../services/storageService");

// Specific rate limiting for AI endpoints
const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 60, // 60 requests per 15 minutes
    message: { error: "Too many AI analysis requests. Please try again in a few minutes." }
});

router.post("/analyze", aiLimiter, async (req, res) => {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: "No image provided for meal analysis." });

    try {
        // Upload image to Cloudinary (or obtain verified URL)
        const imageUrl = await StorageService.uploadImage(image, "fitsnap/meals");

        // Run vision analysis via OpenAI
        const result = await AIService.analyzeMeal(imageUrl);

        // Keep exact response shape expected by frontend
        res.json({
            protein: result.macros.protein,
            carbs: result.macros.carbs,
            fats: result.macros.fats,
            calories: result.estimatedCalories,
            foodName: result.foodName,
            imageUrl: imageUrl.startsWith("http") ? imageUrl : undefined
        });

    } catch (error) {
        console.error("Meal Analysis Error:", error);
        res.status(500).json({ error: error.message || "AI Analysis failed" });
    }
});

router.post("/chat", aiLimiter, async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No message provided for coach." });

    try {
        const aiResponse = await AIService.chatWithCoach(message);
        res.json({ reply: aiResponse });
    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({ error: error.message || "Failed to generate coach response" });
    }
});

router.post("/body-analyze", aiLimiter, async (req, res) => {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: "No image provided for body analysis." });

    try {
        const imageUrl = await StorageService.uploadImage(image, "fitsnap/body-scans");
        const result = await AIService.analyzeBody(imageUrl);
        res.json(result);
    } catch (error) {
        console.error("Body Scan Error:", error);
        res.status(500).json({ error: error.message || "Body Analysis failed" });
    }
});

module.exports = router;
