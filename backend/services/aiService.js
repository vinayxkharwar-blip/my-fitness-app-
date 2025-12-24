/**
 * AI Service Stub
 * Designed to integrate with OpenAI/Gemini/TensorFlow later.
 */

class AIService {
    /**
     * Generate context-aware coach feedback
     * Simulates an LLM response based on heuristics.
     */
    static generateCoachFeedback(userProfile, dailyStats) {
        const { name, goal } = userProfile;
        const { calories, protein, carbs, fat } = dailyStats;

        let feedback = {
            heading: "",
            body: "",
            suggestion: {},
            mood: "neutral"
        };

        // 1. Analyze Protein (Crucial for most goals)
        const proteinProgress = protein.current / protein.target;

        if (proteinProgress < 0.5) {
            feedback.heading = `Let's pump up the protein, ${name}! 🥩`;
            feedback.body = `You're at ${Math.round(proteinProgress * 100)}% of your protein goal. Protein keeps you full and builds muscle.`;
            feedback.suggestion = {
                title: "Quick Fix",
                desc: "How about a Greek Yogurt or a Scoop of Whey?",
                action: "log_food"
            };
            feedback.mood = "urgent"; // Could trigger a yellow/orange UI
        }
        // 2. Analyze Calories
        else if (calories.current > calories.target) {
            feedback.heading = "Slight detour, but we're good! 🛑";
            feedback.body = "You're slightly over calories today. Don't stress—just focus on hydration for the rest of the day.";
            feedback.suggestion = {
                title: "Movement",
                desc: "A 10-minute walk after dinner helps digestion.",
                action: "workout"
            };
            feedback.mood = "calm";
        }
        // 3. Winning State
        else {
            feedback.heading = `Crushing it, ${name}! 🔥`;
            feedback.body = "Your macros are balanced and you're under your calorie limit. Perfect execution.";
            feedback.suggestion = {
                title: "Keep Streak",
                desc: "Log your dinner to finish the day strong.",
                action: "log_food"
            };
            feedback.mood = "success";
        }

        return feedback;
    }

    /**
     * Generate context-aware chat response
     * @param {string} userMessage 
     * @param {object} userContext (optional)
     */
    static async chatWithCoach(userMessage, userContext = {}) {
        const msg = userMessage.toLowerCase();
        let response = {
            text: "I'm not sure specifically, but staying consistent is key! How else can I help?",
            sender: "ai",
            suggestions: []
        };

        // Keyword Matching Logic
        if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
            response.text = "Hello! I'm your AI Coach. Ready to crush your goals today?";
            response.suggestions = ["I need a workout", "Give me a diet tip"];
        }
        else if (msg.includes("diet") || msg.includes("meal") || msg.includes("food") || msg.includes("eat")) {
            response.text = "Nutrition is 80% of the battle! Here's a quick tip:\n\n• Prioritize protein at every meal.\n• Eat colorful vegetables.\n• Stay hydrated (3L+ daily).\n\nWould you like a specific meal plan?";
            response.suggestions = ["Breakfast ideas", "High protein snacks"];
        }
        else if (msg.includes("workout") || msg.includes("exercise") || msg.includes("train") || msg.includes("gym")) {
            response.text = "Let's get moving! For a balanced routine:\n\n1. Warm up (5 mins)\n2. Strength Training (30-45 mins)\n3. Cardio/Cool down (15 mins)\n\nDo you want a home or gym workout?";
            response.suggestions = ["Home workout", "Gym routine"];
        }
        else if (msg.includes("sleep") || msg.includes("tired") || msg.includes("rest")) {
            response.text = "Recovery is where the growth happens. Aim for 7-9 hours of quality sleep.\n\nTip: Avoid screens 1 hour before bed and keep your room cool.";
        }
        else if (msg.includes("motivation") || msg.includes("hard") || msg.includes("quit")) {
            response.text = "Remember why you started! progress is non-linear. You're doing better than everyone who is still on the couch. Keep going! 💪";
        }
        else if (msg.includes("injury") || msg.includes("hurt") || msg.includes("pain")) {
            response.text = "If you're in pain, please stop immediately and rest. If it persists, consult a medical professional. Don't push through bad pain.";
            response.mood = "caution";
        }

        return response;
    }

    /**
     * Mock analysis of a meal image

     * @param {Buffer} imageBuffer 
     */
    static async analyzeMeal(imageBuffer) {
        // TODO: Integrate OpenAI Vision API here
        return {
            foodName: "Grilled Chicken Salad",
            estimatedCalories: 450,
            macros: {
                protein: 40,
                carbs: 10,
                fats: 20
            },
            confidence: 0.95
        };
    }

    /**
     * Generate a workout plan based on user goals
     */
    static async generateWorkoutPlan(userProfile) {
        return {
            planName: "Strength & Mobility",
            daysPerWeek: 4,
            focus: "Full Body"
        };
    }
}

module.exports = AIService;
