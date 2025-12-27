const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const modelsToTry = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-8b",
    "gemini-1.5-pro",
    "gemini-1.5-pro-001",
    "gemini-1.0-pro",
    "gemini-pro",
    "gemini-2.0-flash-exp"
];

async function findWorkingModel() {
    console.log("🔍 Testing models with your API Key...");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    for (const modelName of modelsToTry) {
        process.stdout.write(`Testing ${modelName}... `);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hi");
            const response = await result.response;
            const text = response.text();

            if (text) {
                console.log("✅ SUCCESS!");
                console.log(`\n🎉 FOUND WORKING MODEL: ${modelName}`);
                console.log("Response:", text);
                return; // Stop at first success
            }
        } catch (error) {
            if (error.message.includes("429")) {
                console.log("❌ QUOTA EXCEEDED (Free tier limit)");
            } else if (error.message.includes("404")) {
                console.log("❌ NOT FOUND (Account not eligible)");
            } else {
                console.log("❌ ERROR: " + error.message.split("[")[0]);
            }
        }
    }
    console.log("\n⚠️ No working model found. It might be a persistent Account/Quota issue.");
}

findWorkingModel();
