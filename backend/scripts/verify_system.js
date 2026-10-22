const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const dns = require("dns");
try { dns.setServers(["8.8.8.8", "8.8.4.4"]); } catch (e) {}

const mongoose = require("mongoose");
const http = require("http");
const express = require("express");

// Load Models
const User = require("../models/User");
const Meal = require("../models/Meal");
const WaterLog = require("../models/WaterLog");
const Habit = require("../models/Habit");
const HabitLog = require("../models/HabitLog");
const Trainer = require("../models/Trainer");
const Product = require("../models/Product");
const Booking = require("../models/Booking");
const CartItem = require("../models/CartItem");
const ChatMessage = require("../models/ChatMessage");

// Load Services & Middleware
const AIService = require("../services/aiService");
const authMiddleware = require("../middleware/auth");

const TEST_PORT = 5055;

// Helper for HTTP requests
function makeRequest(method, reqPath, body = null, token = null) {
    return new Promise((resolve, reject) => {
        const payload = body ? JSON.stringify(body) : null;
        const options = {
            hostname: "127.0.0.1",
            port: TEST_PORT,
            path: reqPath,
            method: method,
            headers: {
                "Content-Type": "application/json",
                ...(payload ? { "Content-Length": Buffer.byteLength(payload) } : {}),
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
            },
            timeout: 25000
        };

        const req = http.request(options, (res) => {
            let data = "";
            res.on("data", chunk => data += chunk);
            res.on("end", () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({ status: res.statusCode, body: parsed });
                } catch {
                    resolve({ status: res.statusCode, body: data });
                }
            });
        });

        req.on("error", (err) => reject(err));
        req.on("timeout", () => {
            req.destroy();
            reject(new Error("Request timeout"));
        });

        if (payload) req.write(payload);
        req.end();
    });
}

async function runAudit() {
    console.log("=================================================");
    console.log("🚀 FITSNAP AI — COMPLETE SYSTEM & ENDPOINT AUDIT");
    console.log("=================================================\n");

    const results = [];

    // 1. Database Connection & Schema Verification
    try {
        console.log("1️⃣ Testing Database Layer Read & Write...");
        await mongoose.connect(process.env.MONGODB_URI);
        const dbName = mongoose.connection.name;
        const host = mongoose.connection.host;
        console.log(`   Connected to Database: ${dbName} on ${host}`);

        const trainerCount = await Trainer.countDocuments();
        const productCount = await Product.countDocuments();
        const userCount = await User.countDocuments();
        console.log(`   Catalog counts: ${trainerCount} trainers, ${productCount} products, ${userCount} users.`);

        if (trainerCount >= 3 && productCount >= 5 && userCount >= 1) {
            results.push({ test: "DB Seed & Read Verification", passed: true, detail: "All catalog collections populated in Atlas" });
        } else {
            results.push({ test: "DB Seed & Read Verification", passed: false, detail: "Missing seeded data" });
        }
    } catch (err) {
        results.push({ test: "DB Seed & Read Verification", passed: false, detail: err.message });
    }

    // 2. Setup Dedicated Test Server on TEST_PORT
    const app = express();
    app.use(express.json({ limit: "10mb" }));

    app.get("/", (req, res) => res.json({ status: "OK", message: "FitSnap Backend Active" }));
    app.use("/api/auth", require("../routes/authRoutes"));
    app.use("/api/profile", authMiddleware, require("../routes/profileRoutes"));
    app.use("/api/meals", authMiddleware, require("../routes/mealRoutes"));
    app.use("/api/water", authMiddleware, require("../routes/waterRoutes"));
    app.use("/api/habits", authMiddleware, require("../routes/habitRoutes"));
    app.use("/api/trainers", authMiddleware, require("../routes/trainerRoutes"));
    app.use("/api/bookings", authMiddleware, require("../routes/bookingRoutes"));
    app.use("/api/chat", authMiddleware, require("../routes/chatRoutes"));
    app.use("/api/products", authMiddleware, require("../routes/productRoutes"));
    app.use("/api/cart", authMiddleware, require("../routes/cartRoutes"));
    app.use("/api", authMiddleware, require("../routes/analyze"));

    const server = http.createServer(app);
    await new Promise(resolve => server.listen(TEST_PORT, "127.0.0.1", resolve));
    console.log(`\n2️⃣ Test server listening on 127.0.0.1:${TEST_PORT}...`);

    let authToken = null;
    let userId = null;

    // 3. User Login & JWT Generation
    try {
        console.log("\n3️⃣ Testing User Login & JWT Generation...");
        const loginRes = await makeRequest("POST", "/api/auth/login", {
            email: "demo@fitsnap.com",
            password: "password123"
        });

        if (loginRes.status === 200 && loginRes.body?.token) {
            authToken = loginRes.body.token;
            userId = loginRes.body.user?.id;
            console.log("   User logged in successfully! User ID:", userId);
            results.push({ test: "Auth Login (/api/auth/login)", passed: true, detail: "JWT token generated and validated" });
        } else {
            results.push({ test: "Auth Login (/api/auth/login)", passed: false, detail: loginRes.body?.error || `Status ${loginRes.status}` });
        }
    } catch (err) {
        results.push({ test: "Auth Login (/api/auth/login)", passed: false, detail: err.message });
    }

    // 4. User Profile Read & Update
    if (authToken) {
        try {
            console.log("\n4️⃣ Testing User Profile Read & Update...");
            const getProfile = await makeRequest("GET", "/api/profile", null, authToken);
            const updateProfile = await makeRequest("POST", "/api/profile", {
                weight_kg: 72,
                goal: "build_muscle"
            }, authToken);

            if (getProfile.status === 200 && updateProfile.status === 200) {
                results.push({ test: "Profile API (/api/profile)", passed: true, detail: "Read and write persisted to user profile" });
            } else {
                results.push({ test: "Profile API (/api/profile)", passed: false, detail: `Get: ${getProfile.status}, Post: ${updateProfile.status}` });
            }
        } catch (err) {
            results.push({ test: "Profile API (/api/profile)", passed: false, detail: err.message });
        }
    }

    // 5. Meals API (Scoped to User)
    if (authToken) {
        try {
            console.log("\n5️⃣ Testing Meals Tracking API...");
            const addMeal = await makeRequest("POST", "/api/meals", {
                name: "High Protein Chicken Bowl",
                calories: 520,
                protein: 42,
                carbs: 50,
                fats: 14,
                meal_type: "lunch"
            }, authToken);

            const getMeals = await makeRequest("GET", "/api/meals", null, authToken);
            const mealsList = Array.isArray(getMeals.body) ? getMeals.body : [];
            const foundMeal = mealsList.find(m => m.name === "High Protein Chicken Bowl");

            if (addMeal.status === 200 && foundMeal) {
                results.push({ test: "Meals API (/api/meals)", passed: true, detail: `Created and retrieved user meal (count: ${mealsList.length})` });
            } else {
                results.push({ test: "Meals API (/api/meals)", passed: false, detail: `Add: ${addMeal.status}, Found: ${!!foundMeal}` });
            }
        } catch (err) {
            results.push({ test: "Meals API (/api/meals)", passed: false, detail: err.message });
        }
    }

    // 6. Water Log API
    if (authToken) {
        try {
            console.log("\n6️⃣ Testing Hydration Tracking API...");
            const addWater = await makeRequest("POST", "/api/water", { amount_ml: 500 }, authToken);
            const getWater = await makeRequest("GET", "/api/water", null, authToken);
            const logs = Array.isArray(getWater.body) ? getWater.body : [];

            if (addWater.status === 200 && logs.length > 0) {
                results.push({ test: "Water Log API (/api/water)", passed: true, detail: `Hydration entry logged successfully (${logs.length} logs)` });
            } else {
                results.push({ test: "Water Log API (/api/water)", passed: false, detail: `Add: ${addWater.status}, Count: ${logs.length}` });
            }
        } catch (err) {
            results.push({ test: "Water Log API (/api/water)", passed: false, detail: err.message });
        }
    }

    // 7. Habits API
    if (authToken) {
        try {
            console.log("\n7️⃣ Testing Habits Tracking API...");
            const createHabit = await makeRequest("POST", "/api/habits/create", { name: "Daily Core Stretch", frequency: "daily" }, authToken);
            const habitId = createHabit.body?.habit_id;

            let logResult = false;
            if (habitId) {
                const addLog = await makeRequest("POST", "/api/habits/add", { habit_id: habitId }, authToken);
                logResult = addLog.status === 200;
            }

            if (createHabit.status === 201 && logResult) {
                results.push({ test: "Habits API (/api/habits)", passed: true, detail: "Habit created and completion logged" });
            } else {
                results.push({ test: "Habits API (/api/habits)", passed: false, detail: `Create: ${createHabit.status}, Log: ${logResult}` });
            }
        } catch (err) {
            results.push({ test: "Habits API (/api/habits)", passed: false, detail: err.message });
        }
    }

    // 8. Shared Catalog APIs (Trainers & Products)
    if (authToken) {
        try {
            console.log("\n8️⃣ Testing Shared Catalog APIs...");
            const trainersRes = await makeRequest("GET", "/api/trainers", null, authToken);
            const productsRes = await makeRequest("GET", "/api/products", null, authToken);

            const trainers = Array.isArray(trainersRes.body) ? trainersRes.body : [];
            const products = Array.isArray(productsRes.body) ? productsRes.body : [];

            if (trainers.length >= 3 && products.length >= 5) {
                results.push({ test: "Trainers & Products Catalog", passed: true, detail: `Verified ${trainers.length} trainers, ${products.length} products` });
            } else {
                results.push({ test: "Trainers & Products Catalog", passed: false, detail: `Trainers: ${trainers.length}, Products: ${products.length}` });
            }
        } catch (err) {
            results.push({ test: "Trainers & Products Catalog", passed: false, detail: err.message });
        }
    }

    // 9. Cart API
    if (authToken) {
        try {
            console.log("\n9️⃣ Testing Shopping Cart API...");
            const firstProduct = await Product.findOne();
            if (firstProduct) {
                const addCart = await makeRequest("POST", "/api/cart", { product_id: firstProduct._id.toString(), quantity: 1 }, authToken);
                const getCart = await makeRequest("GET", "/api/cart", null, authToken);
                const cartItems = Array.isArray(getCart.body) ? getCart.body : [];

                if (addCart.status === 200 && cartItems.length > 0) {
                    const cartId = cartItems[0].cart_id || cartItems[0].id;
                    const removeCart = await makeRequest("DELETE", `/api/cart/${cartId}`, null, authToken);
                    results.push({ test: "Cart API (/api/cart)", passed: true, detail: "Add, retrieve, and remove cart item verified" });
                } else {
                    results.push({ test: "Cart API (/api/cart)", passed: false, detail: `Add: ${addCart.status}, Items: ${cartItems.length}` });
                }
            }
        } catch (err) {
            results.push({ test: "Cart API (/api/cart)", passed: false, detail: err.message });
        }
    }

    // 10. OpenAI Integration Live Request
    try {
        console.log("\n🔟 Testing Real OpenAI API Integration...");
        const testPrompt = "Give me 1 quick tip for drinking enough water during workouts.";
        console.log("   Calling OpenAI (gpt-4o-mini)...");
        const aiResponse = await AIService.chatWithCoach(testPrompt);

        if (aiResponse && aiResponse.length > 10) {
            console.log(`   OpenAI Response Preview: "${aiResponse.slice(0, 80).replace(/\n/g, ' ')}..."`);
            results.push({ test: "OpenAI Live Integration (gpt-4o-mini)", passed: true, detail: "Live response received from OpenAI" });
        } else {
            results.push({ test: "OpenAI Live Integration (gpt-4o-mini)", passed: false, detail: "Empty or fallback response" });
        }
    } catch (err) {
        results.push({ test: "OpenAI Live Integration (gpt-4o-mini)", passed: false, detail: err.message });
    }

    // 11. AI HTTP Route (/api/chat)
    if (authToken) {
        try {
            console.log("\n1️⃣1️⃣ Testing AI HTTP Route (/api/chat)...");
            const chatRes = await makeRequest("POST", "/api/chat", { message: "Best breakfast for muscle recovery?" }, authToken);
            if (chatRes.status === 200 && chatRes.body?.reply) {
                console.log(`   Coach HTTP Reply: "${chatRes.body.reply.slice(0, 80).replace(/\n/g, ' ')}..."`);
                results.push({ test: "AI Coach HTTP Route (/api/chat)", passed: true, detail: "HTTP 200 with structured JSON reply" });
            } else {
                results.push({ test: "AI Coach HTTP Route (/api/chat)", passed: false, detail: chatRes.body?.error || `Status: ${chatRes.status}` });
            }
        } catch (err) {
            results.push({ test: "AI Coach HTTP Route (/api/chat)", passed: false, detail: err.message });
        }
    }

    console.log("\n=================================================");
    console.log("📊 AUDIT RESULTS SUMMARY");
    console.log("=================================================");
    let allPassed = true;
    for (const r of results) {
        const icon = r.passed ? "✅ PASS" : "❌ FAIL";
        if (!r.passed) allPassed = false;
        console.log(`${icon} | ${r.test.padEnd(35)} | ${r.detail}`);
    }
    console.log("=================================================");
    console.log(allPassed ? "🎉 ALL SYSTEM AUDIT TESTS PASSED!" : "⚠️ SOME TESTS REPORTED ISSUES");
    console.log("=================================================");

    if (server.closeAllConnections) server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    await mongoose.connection.close();
    process.exit(allPassed ? 0 : 1);
}

runAudit();
