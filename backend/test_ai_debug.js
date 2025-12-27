const AIService = require("./services/aiService");
require("dotenv").config();

async function test() {
    console.log("Testing AI Service...");
    console.log("API Key present:", !!process.env.GEMINI_API_KEY);
    console.log("API Key length:", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0);

    try {
        const response = await AIService.chatWithCoach("Hello");
        console.log("Response:", response);
    } catch (error) {
        console.error("FATAL ERROR:", error);
    }
}

test();
