const OpenAI = require("openai");

class AIService {
    static get client() {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error("Missing OPENAI_API_KEY in .env");
        }
        return new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            timeout: 30000, // 30-second timeout
            maxRetries: 2
        });
    }

    static get MODEL() {
        return process.env.OPENAI_MODEL || "gpt-4o-mini";
    }

    /**
     * Formats an image string to an acceptable OpenAI image_url format
     */
    static formatImageUrl(image) {
        if (!image) throw new Error("Image input is required.");
        if (image.startsWith("http://") || image.startsWith("https://")) {
            return image;
        }
        if (image.startsWith("data:image/")) {
            return image;
        }
        // Assume standard base64 jpeg if prefix missing
        return `data:image/jpeg;base64,${image}`;
    }

    /**
     * Analyze meal image and return structured nutritional breakdown
     */
    static async analyzeMeal(imageInput) {
        try {
            const openai = this.client;
            const imageUrl = this.formatImageUrl(imageInput);

            const prompt = `
You are an expert sports nutritionist and food scientist.
Analyze the food in this image and calculate its nutritional content.
Return a STRICT JSON object with this EXACT structure:
{
  "foodName": "Name of the dish or food items",
  "estimatedCalories": 450,
  "macros": {
    "protein": 35,
    "carbs": 45,
    "fats": 12
  },
  "breakdown": [
    {
      "item": "Chicken breast",
      "amount": "150g",
      "calories": 250,
      "protein": 31,
      "carbs": 0,
      "fats": 4
    }
  ],
  "confidence": "high",
  "healthTip": "Rich in lean protein and complex carbs."
}
All macronutrients (protein, carbs, fats) and estimatedCalories must be integers. Do not include markdown code blocks or text outside the JSON.`;

            const response = await openai.chat.completions.create({
                model: this.MODEL,
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: prompt },
                            { type: "image_url", image_url: { url: imageUrl, detail: "low" } }
                        ]
                    }
                ],
                response_format: { type: "json_object" },
                max_tokens: 800,
                temperature: 0.2
            });

            const content = response.choices[0]?.message?.content;
            if (!content) throw new Error("Empty response received from OpenAI");

            const parsed = JSON.parse(content);
            return {
                foodName: parsed.foodName || "Identified Food Item",
                estimatedCalories: Number(parsed.estimatedCalories) || 0,
                macros: {
                    protein: Number(parsed.macros?.protein) || 0,
                    carbs: Number(parsed.macros?.carbs) || 0,
                    fats: Number(parsed.macros?.fats) || 0
                },
                breakdown: parsed.breakdown || [],
                confidence: parsed.confidence || "medium",
                healthTip: parsed.healthTip || "Nutritious meal option"
            };

        } catch (error) {
            console.error("OpenAI Meal Analysis Error:", error.message);
            // Fallback for offline demo reliability
            return this.getMockMealAnalysis();
        }
    }

    /**
     * Chat with AI Fitness Coach
     */
    static async chatWithCoach(userMessage, userContext = {}) {
        try {
            const openai = this.client;

            const systemPrompt = `
You are an expert, encouraging, and empathetic AI Fitness and Wellness Coach at FitSnap AI.
Follow these coaching rules:
1. Provide concise, actionable, and science-backed fitness, nutrition, and recovery advice.
2. If the user asks for a workout, give clear sets, reps, and exercise form cues.
3. If the user asks about diet, suggest healthy macros and meal ideas.
4. Keep the tone motivational, warm, and professional.
5. Limit responses to 2-3 focused paragraphs or bullet points.`;

            const messages = [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage }
            ];

            const response = await openai.chat.completions.create({
                model: this.MODEL,
                messages,
                temperature: 0.7,
                max_tokens: 600
            });

            return response.choices[0]?.message?.content?.trim() || "Let's keep pushing towards your fitness goals today!";

        } catch (error) {
            console.error("OpenAI Coach Chat Error:", error.message);
            return "Great question! Focus on progressive overload in your workouts, prioritize 7-8 hours of quality sleep, and aim for 1.6-2.0g of protein per kg of bodyweight to optimize your recovery.";
        }
    }

    /**
     * Analyze body composition and posture from photo
     */
    static async analyzeBody(imageInput) {
        try {
            const openai = this.client;
            const imageUrl = this.formatImageUrl(imageInput);

            const prompt = `
You are an expert fitness coach and physique analyst.
Analyze the body posture and general physique traits visible in this image.
Return a STRICT JSON object with this EXACT structure:
{
  "bodyFatEstimate": "14-17%",
  "muscleMassEstimate": "Medium-High",
  "postureAnalysis": "Good thoracic alignment with slight anterior pelvic tilt.",
  "physiqueScore": 85,
  "recommendations": [
    "Incorporate hip flexor stretches and core strengthening",
    "Focus on compound upper-body pulling movements",
    "Maintain consistent protein intake to preserve lean mass"
  ]
}
Do not return any markdown code fence or text outside the JSON object.`;

            const response = await openai.chat.completions.create({
                model: this.MODEL,
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: prompt },
                            { type: "image_url", image_url: { url: imageUrl, detail: "low" } }
                        ]
                    }
                ],
                response_format: { type: "json_object" },
                max_tokens: 800,
                temperature: 0.3
            });

            const content = response.choices[0]?.message?.content;
            if (!content) throw new Error("Empty response received from OpenAI");

            return JSON.parse(content);

        } catch (error) {
            console.error("OpenAI Body Analysis Error:", error.message);
            return this.getMockBodyAnalysis();
        }
    }

    static getMockMealAnalysis() {
        return {
            foodName: "Balanced Protein Bowl",
            estimatedCalories: 480,
            macros: {
                protein: 36,
                carbs: 48,
                fats: 14
            },
            breakdown: [
                { item: "Lean Protein", amount: "150g", calories: 240, protein: 30, carbs: 0, fats: 5 },
                { item: "Complex Carbohydrates", amount: "100g", calories: 150, protein: 4, carbs: 32, fats: 2 },
                { item: "Healthy Greens & Fats", amount: "80g", calories: 90, protein: 2, carbs: 16, fats: 7 }
            ],
            confidence: "medium",
            healthTip: "Solid nutrient balance for muscle maintenance."
        };
    }

    static getMockBodyAnalysis() {
        return {
            bodyFatEstimate: "16-19%",
            muscleMassEstimate: "Athletic Build",
            postureAnalysis: "Balanced posture with good shoulder symmetry.",
            physiqueScore: 82,
            recommendations: [
                "Prioritize progressive overload on compound lifts",
                "Maintain 0.5kg/week fat loss target if cutting",
                "Ensure 3L daily water intake for peak muscle hydration"
            ]
        };
    }
}

module.exports = AIService;