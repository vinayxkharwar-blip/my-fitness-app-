const fs = require('fs');

let file = fs.readFileSync('services/aiService.js', 'utf8');

// Replace chatWithCoach logic
const chatWithCoachRegex = /static async chatWithCoach\([^\{]+\{[\s\S]*?\n    \}/;
const newChatWithCoach = `static async chatWithCoach(userMessage, userContext = {}) {
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
    }`;

file = file.replace(chatWithCoachRegex, newChatWithCoach);

fs.writeFileSync('services/aiService.js', file);
console.log('done');
