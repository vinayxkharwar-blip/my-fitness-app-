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
            console.log("GEMINI_API_KEY loaded:", !!process.env.GEMINI_API_KEY);
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const result = await model.generateContent(userMessage);
            const response = result.response.text();
            
            return response;

        } catch (error) {
            console.error("AI ERROR:", error);
            
            const msg = userMessage.toLowerCase();
            if (msg.includes("sleep")) {
                return "Aim for 7-9 hours of quality sleep. Try limiting screen time 1 hour before bed and keep your room cool and dark.";
            } else if (msg.includes("food") || msg.includes("diet") || msg.includes("eat")) {
                return "Focus on lean proteins, complex carbs, and healthy fats. Stay hydrated and avoid processed sugars.";
            } else if (msg.includes("workout") || msg.includes("exercise") || msg.includes("gym")) {
                return "Here's a quick 15-min HIIT workout: Jumping jacks, squats, push-ups, burpees, and high knees. 45 seconds on, 15 seconds off. Let's go!";
            } else {
                return "I'm having trouble connecting right now, but remember: consistency is the key to achieving your fitness goals!";
            }
        }
    }

    /**
     * Analyze a meal image
     */
    static async analyzeMeal(imageBase64) {
        try {
            const model = this.getVisionModel();
            const updateBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
            const prompt = `Analyze food.JSON: { "foodName": "...", "estimatedCalories": 0, "macros": { "protein": 0, "carbs": 0, "fats": 0 }, "confidence": 0.9 }`;
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
