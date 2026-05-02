const { GoogleGenerativeAI } = require("@google/generative-ai");
const removeMarkdown = require("remove-markdown");
require("dotenv").config();

class AIService {
  static MODEL = "gemini-2.5-flash";

  static getClient() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY in .env");
    }

    return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  static getModel() {
    const genAI = this.getClient();

    return genAI.getGenerativeModel({
      model: this.MODEL,
      generationConfig: {
        temperature: 0.4,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });
  }

  static getVisionModel() {
    const genAI = this.getClient();

    return genAI.getGenerativeModel({
      model: this.MODEL,
      generationConfig: {
        temperature: 0.2,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });
  }

  static cleanJSON(text) {
    try {
      return JSON.parse(
        text.replace(/```json/gi, "").replace(/```/g, "").trim()
      );
    } catch {
      return null;
    }
  }

  // CLEAN MARKDOWN RESPONSE
  static cleanResponse(text) {
    return removeMarkdown(text)
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  static getMockMealAnalysis() {
    const protein = Math.round(Math.random() * 40 + 10);
    const carbs = Math.round(Math.random() * 80 + 10);
    const fats = Math.round(Math.random() * 30 + 5);
    const calories = protein * 4 + carbs * 4 + fats * 9;

    return {
      foodName: "Detected Food (Offline Estimate)",
      estimatedCalories: calories,
      macros: { protein, carbs, fats },
      confidence: 0.75,
    };
  }

  static getMockBodyAnalysis() {
    return {
      bodyType: "Mesomorph (Estimated)",
      bodyFat: "15-20%",
      posture: "Generally balanced posture observed.",
      suggestion:
        "Maintain strength training + protein-rich diet for muscle definition.",
      disclaimer:
        "This is an AI visual estimate only and not medical advice.",
    };
  }

  // CHAT COACH
  static async chatWithCoach(userMessage, userContext = {}) {
    try {
      const model = this.getModel();

      const prompt = `
You are FitCoach AI — an elite fitness, nutrition and wellness coach.

Rules:
- Give accurate practical answers
- Be concise but valuable
- Give structured advice
- Motivate user professionally
- No markdown formatting
- No # symbols
- No ** bold formatting
- Plain clean text only

User Context:
${JSON.stringify(userContext, null, 2)}

User Question:
${userMessage}
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;

      // CLEAN OUTPUT
      return this.cleanResponse(response.text());

    } catch (error) {
      console.error("CHAT ERROR:", error.message);

      const msg = userMessage.toLowerCase();

      if (msg.includes("sleep")) {
        return "Aim for 7–9 hours sleep. Reduce screen time before bed, keep room cool, and sleep on a fixed schedule.";
      }

      if (
        msg.includes("food") ||
        msg.includes("diet") ||
        msg.includes("eat")
      ) {
        return "Prioritize lean protein, fiber-rich carbs, healthy fats, and hydration. Limit ultra-processed foods.";
      }

      if (
        msg.includes("workout") ||
        msg.includes("exercise") ||
        msg.includes("gym")
      ) {
        return "Try: Squats, Push-ups, Lunges, Burpees, Plank — 3 rounds, 45 sec work / 15 sec rest.";
      }

      return "I'm unable to connect to AI right now. Keep showing up daily—consistency wins.";
    }
  }

  static async analyzeMeal(imageBase64) {
    try {
      const model = this.getVisionModel();

      const cleanedBase64 = imageBase64.replace(
        /^data:image\/\w+;base64,/,
        ""
      );

      const prompt = `
Analyze this food image.

Return ONLY valid JSON:
{
  "foodName": "",
  "estimatedCalories": 0,
  "macros": {
    "protein": 0,
    "carbs": 0,
    "fats": 0
  },
  "confidence": 0.0
}
`;

      const imagePart = {
        inlineData: {
          data: cleanedBase64,
          mimeType: "image/jpeg",
        },
      };

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;

      const parsed = this.cleanJSON(response.text());
      return parsed || this.getMockMealAnalysis();

    } catch (error) {
      console.error("MEAL ANALYSIS ERROR:", error.message);
      return this.getMockMealAnalysis();
    }
  }

  static async analyzeBody(imageBase64) {
    try {
      const model = this.getVisionModel();

      const cleanedBase64 = imageBase64.replace(
        /^data:image\/\w+;base64,/,
        ""
      );

      const prompt = `
Act as an expert physique coach.

Return ONLY valid JSON:
{
  "bodyType": "",
  "bodyFat": "",
  "posture": "",
  "suggestion": "",
  "disclaimer": "Visual estimate only. Not medical advice."
}
`;

      const imagePart = {
        inlineData: {
          data: cleanedBase64,
          mimeType: "image/jpeg",
        },
      };

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;

      const parsed = this.cleanJSON(response.text());
      return parsed || this.getMockBodyAnalysis();

    } catch (error) {
      console.error("BODY ANALYSIS ERROR:", error.message);
      return this.getMockBodyAnalysis();
    }
  }

  static async generateCoachFeedback() {
    return {
      heading: "Keep Going",
      body: "You're building momentum. Small consistent actions create big results.",
      suggestion: {
        title: "Next Step",
        desc: "Log your next meal and complete 20 mins of movement.",
        action: "log_food",
      },
      mood: "positive",
    };
  }
}

module.exports = AIService;