const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

class AIService {
    static getModel() {
        if (!process.env.GEMINI_API_KEY) throw new Error("Missing API Key");
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        return genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    }

    static getVisionModel() {
        if (!process.env.GEMINI_API_KEY) throw new Error("Missing API Key");
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        return genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    }

    // --- FALLBACK LOGIC (Original Mock) ---
    static getMockChatResponse(msg) {
        msg = msg.toLowerCase();
        let response = {
            text: "I'm currently in Offline Mode. I can help with 'Workouts', 'Diet Tips', or 'Motivation'. What do you need?",
            sender: "ai",
            suggestions: ["Give me a workout", "Diet tip"]
        };

        if (msg.includes("hello") || msg.includes("hi")) {
            response.text = "Hello! I'm your AI Coach. Ready to crush your goals today?";
            response.suggestions = ["Workout", "Diet tip"];
        } else if (msg.includes("diet") || msg.includes("food") || msg.includes("meal")) {
            response.text = "Nutrition is key! Focus on whole foods, protein at every meal, and staying hydrated.";
            response.suggestions = ["Breakfast ideas", "High protein snacks"];
        } else if (msg.includes("workout") || msg.includes("gym") || msg.includes("exercise")) {
            response.text = "Movement is medicine! A mix of cardio and strength training is best.";
            response.suggestions = ["Home workout", "Gym routine"];
        } else if (msg.includes("motivation") || msg.includes("tired")) {
            response.text = "Consistency beats intensity. Just show up for 10 minutes today!";
        } else if (msg.includes("yes") || msg.includes("sure") || msg.includes("ok")) {
            response.text = "Great! Let's get started. Do you want to focus on nutrition or fitness?";
            response.suggestions = ["Nutrition", "Fitness"];
        } else if (msg.includes("thanks") || msg.includes("thank")) {
            response.text = "You're welcome! Keep up the hard work.";
        }
        return response;
    }

    static getMockAnalysis() {
        const protein = Math.round(Math.random() * 40 + 10);
        const carbs = Math.round(Math.random() * 80 + 10);
        const fats = Math.round(Math.random() * 30 + 5);
        const calories = protein * 4 + carbs * 4 + fats * 9;
        return {
            foodName: "Detected Food (Offline)",
            estimatedCalories: calories,
            macros: { protein, carbs, fats },
            confidence: 0.8
        };
    }

    // --- MAIN METHODS ---

    /**
     * Generate context-aware chat response
     */
    static async chatWithCoach(userMessage, userContext = {}) {
        try {
            const model = this.getModel();
            const chat = model.startChat({
                history: [
                    { role: "user", parts: [{ text: "You are an AI Fitness Coach. Be motivating." }] },
                    { role: "model", parts: [{ text: "Ready to help!" }] },
                ],
            });

            const result = await chat.sendMessage(userMessage);
            const response = await result.response;
            return {
                text: response.text(),
                sender: "ai",
                suggestions: ["Diet tip", "Workout plan"]
            };

        } catch (error) {
            console.error("AI Chat Failed (Using Fallback):", error.message);
            // Fallback to mock
            return this.getMockChatResponse(userMessage);
        }
    }

    /**
     * Analyze a meal image
     */
    static async analyzeMeal(imageBase64) {
        try {
            const model = this.getVisionModel();
            const updateBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
            const prompt = `Analyze food. JSON: { "foodName": "...", "estimatedCalories": 0, "macros": { "protein": 0, "carbs": 0, "fats": 0 }, "confidence": 0.9 }`;
            const imagePart = { inlineData: { data: updateBase64, mimeType: "image/jpeg" } };

            const result = await model.generateContent([prompt, imagePart]);
            const response = await result.response;
            let text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();
            return JSON.parse(text);

        } catch (error) {
            console.error("AI Vision Failed (Using Fallback):", error.message);
            return this.getMockAnalysis();
        }
    }

    /**
     * Analyze a body physique image
     */
    static async analyzeBody(imageBase64) {
        try {
            const model = this.getVisionModel();
            const updateBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
            const prompt = `
            Act as a fitness coach. Analyze this physique image for:
            1. Body Type (e.g., Ectomorph, Mesomorph, Endomorph, or hybrid)
            2. Estimated Body Fat Percentage Range (visual estimate only)
            3. Posture analysis (any observations like forward head, rounded shoulders)
            
            Return ONLY JSON:
            {
                "bodyType": "...",
                "bodyFat": "...",
                "posture": "...",
                "suggestion": "..."
            }
            Include a disclaimer that this is not medical advice.
            `;
            const imagePart = { inlineData: { data: updateBase64, mimeType: "image/jpeg" } };

            const result = await model.generateContent([prompt, imagePart]);
            const response = await result.response;
            let text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();
            return JSON.parse(text);

        } catch (error) {
            console.error("Body Analysis Failed (Using Fallback):", error.message);
            return this.getMockBodyAnalysis();
        }
    }

    static getMockBodyAnalysis() {
        return {
            bodyType: "Mesomorph (Estimated)",
            bodyFat: "15-20% Range",
            posture: "Good alignment observed. Shoulders look level.",
            suggestion: "Great baseline! Focus on hypertrophy to build more definition.",
            disclaimer: "Offline Mode: This is a simulated estimate."
        };
    }

    static async generateCoachFeedback(userProfile, dailyStats) {
        // Simplified fallback for feedback too if needed, or just return basic object
        return {
            heading: "Keep Pushing!",
            body: "You are doing great. Keep logging your meals.",
            suggestion: { title: "Log", desc: "Track your next meal", action: "log_food" },
            mood: "neutral"
        };
    }
}

module.exports = AIService;
