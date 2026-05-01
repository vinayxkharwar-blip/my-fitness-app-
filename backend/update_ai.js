const fs = require('fs');

let file = fs.readFileSync('services/aiService.js', 'utf8');

// 1. Remove getMockChatResponse
file = file.replace(/\/\/ --- FALLBACK LOGIC \(Original Mock\) ---[\s\S]*?static getMockAnalysis/m, 'static getMockAnalysis');

// 2. Replace chatWithCoach completely
const chatWithCoachRegex = /static async chatWithCoach\([^\{]+\{[\s\S]*?\n    \}/;
const newChatWithCoach = `static async chatWithCoach(userMessage, userContext = {}) {
        try {
            const model = this.getModel();
            const chat = model.startChat({
                history: [
                    {
                        role: "user", parts: [{
                            text: \`
You are an AI fitness coach.

IMPORTANT BEHAVIOR RULES:
- Respond ONLY based on the user’s current message.
- Do NOT repeat the same response multiple times.
- Never spam error or rate-limit messages.

INTENT HANDLING:
- If user asks for diet → give a clear diet plan.
- If user asks for workout → give a workout routine.
- If user asks for motivation → give motivation.
- If request is unclear → ask ONE short question.

Tone:
- Friendly
- Calm
- Professional fitness coach
\` }]
                    },
                    { role: "model", parts: [{ text: "Understood. I'm ready to coach based on these specific rules." }] },
                ],
            });

            const result = await chat.sendMessage(userMessage);
            const response = await result.response;
            return response.text();

        } catch (error) {
            console.error("AI Chat Failed:", error.message);
            // Fallback (Important for Demo)
            return "Here's a quick 15-min HIIT workout: Jumping jacks, squats, push-ups, burpees, and high knees. 45 seconds on, 15 seconds off. Let's go!";
        }
    }`;

file = file.replace(chatWithCoachRegex, newChatWithCoach);

fs.writeFileSync('services/aiService.js', file);
console.log('done');
