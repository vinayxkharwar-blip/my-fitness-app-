const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function listModels() {
    console.log("Listing models...");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // There isn't a direct listModels on the main client in older versions, 
    // but newer specific versions might have it. 
    // Let's try to just hit the API endpoint directly using fetch if the SDK doesn't expose it easily,
    // Or just try a known working stable model: gemini-1.0-pro-latest.

    // Actually, asking the user to check is better if I cant list.
    // But let's try one more common variant: gemini-1.5-flash-latest

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent("Test");
        console.log("Success with gemini-1.5-flash-latest");
    } catch (e) {
        console.log("Failed gemini-1.5-flash-latest: " + e.message);
    }
}

listModels();
