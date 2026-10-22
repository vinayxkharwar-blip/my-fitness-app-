const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const dns = require("dns");
try { dns.setServers(["8.8.8.8", "8.8.4.4"]); } catch (e) {}

const mongoose = require("mongoose");
const http = require("http");
const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Meal = require("../models/Meal");
const authMiddleware = require("../middleware/auth");

const TEST_PORT = 5056;

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
            timeout: 15000
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

async function runAuthVerification() {
    console.log("=================================================");
    console.log("🔐 FITSNAP AUTHENTICATION & SECURITY VERIFICATION");
    console.log("=================================================\n");

    const results = [];

    // 1. Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to Atlas: ${mongoose.connection.name}`);

    // 2. Setup Test Express Server
    const app = express();
    app.use(express.json());
    app.use("/api/auth", require("../routes/authRoutes"));
    app.use("/api/profile", authMiddleware, require("../routes/profileRoutes"));
    app.use("/api/meals", authMiddleware, require("../routes/mealRoutes"));

    const server = http.createServer(app);
    await new Promise(resolve => server.listen(TEST_PORT, "127.0.0.1", resolve));
    console.log(`Test server running on port ${TEST_PORT}\n`);

    const timestamp = Date.now();
    const testUserAEmail = `tester_a_${timestamp}@fitsnap.com`;
    const testUserBEmail = `tester_b_${timestamp}@fitsnap.com`;
    const rawPassword = "SecurePass123!";

    let tokenA = null;
    let userAId = null;
    let tokenB = null;
    let userBId = null;

    // Test 1: Validation rejection (short password)
    try {
        const shortPassRes = await makeRequest("POST", "/api/auth/register", {
            full_name: "Short Pass",
            email: "short@test.com",
            password: "123"
        });
        if (shortPassRes.status === 400 && shortPassRes.body?.error?.includes("6 characters")) {
            results.push({ test: "Validation: Short Password Rejection", passed: true, detail: "Rejected with HTTP 400" });
        } else {
            results.push({ test: "Validation: Short Password Rejection", passed: false, detail: `Status: ${shortPassRes.status}` });
        }
    } catch (e) {
        results.push({ test: "Validation: Short Password Rejection", passed: false, detail: e.message });
    }

    // Test 2: Validation rejection (invalid email)
    try {
        const badEmailRes = await makeRequest("POST", "/api/auth/register", {
            full_name: "Bad Email",
            email: "invalid-email-address",
            password: "password123"
        });
        if (badEmailRes.status === 400 && badEmailRes.body?.error?.includes("valid email")) {
            results.push({ test: "Validation: Malformed Email Rejection", passed: true, detail: "Rejected with HTTP 400" });
        } else {
            results.push({ test: "Validation: Malformed Email Rejection", passed: false, detail: `Status: ${badEmailRes.status}` });
        }
    } catch (e) {
        results.push({ test: "Validation: Malformed Email Rejection", passed: false, detail: e.message });
    }

    // Test 3: Signup User A
    try {
        const regRes = await makeRequest("POST", "/api/auth/register", {
            full_name: "Alice Tester",
            email: testUserAEmail,
            password: rawPassword,
            weight_kg: 62,
            height_cm: 168
        });

        if (regRes.status === 201 && regRes.body?.token && regRes.body?.user) {
            tokenA = regRes.body.token;
            userAId = regRes.body.user.id;
            results.push({ test: "User Signup (Register)", passed: true, detail: `User created & JWT returned (${userAId})` });
        } else {
            results.push({ test: "User Signup (Register)", passed: false, detail: regRes.body?.error || `Status: ${regRes.status}` });
        }
    } catch (e) {
        results.push({ test: "User Signup (Register)", passed: false, detail: e.message });
    }

    // Test 4: Verify Password Hashing in MongoDB (Never stored plain text!)
    try {
        const userInDb = await User.findOne({ email: testUserAEmail });
        if (userInDb && userInDb.password !== rawPassword && userInDb.password.startsWith("$2")) {
            const isMatch = await bcrypt.compare(rawPassword, userInDb.password);
            if (isMatch) {
                results.push({ test: "Password Hashing (bcrypt)", passed: true, detail: "Hashed with bcrypt salt (not plain-text)" });
            } else {
                results.push({ test: "Password Hashing (bcrypt)", passed: false, detail: "Hash does not match password" });
            }
        } else {
            results.push({ test: "Password Hashing (bcrypt)", passed: false, detail: "Plaintext or missing in DB" });
        }
    } catch (e) {
        results.push({ test: "Password Hashing (bcrypt)", passed: false, detail: e.message });
    }

    // Test 5: Reject Duplicate Email Registration
    try {
        const dupRes = await makeRequest("POST", "/api/auth/register", {
            full_name: "Duplicate User",
            email: testUserAEmail,
            password: rawPassword
        });
        if (dupRes.status === 400) {
            results.push({ test: "Duplicate Account Prevention", passed: true, detail: "Duplicate email registration rejected" });
        } else {
            results.push({ test: "Duplicate Account Prevention", passed: false, detail: `Status: ${dupRes.status}` });
        }
    } catch (e) {
        results.push({ test: "Duplicate Account Prevention", passed: false, detail: e.message });
    }

    // Test 6: Login with Incorrect Password
    try {
        const wrongLoginRes = await makeRequest("POST", "/api/auth/login", {
            email: testUserAEmail,
            password: "WrongPassword999!"
        });
        if (wrongLoginRes.status === 401) {
            results.push({ test: "Invalid Password Rejection", passed: true, detail: "HTTP 401 returned on incorrect password" });
        } else {
            results.push({ test: "Invalid Password Rejection", passed: false, detail: `Status: ${wrongLoginRes.status}` });
        }
    } catch (e) {
        results.push({ test: "Invalid Password Rejection", passed: false, detail: e.message });
    }

    // Test 7: Login with Correct Credentials
    try {
        const loginRes = await makeRequest("POST", "/api/auth/login", {
            email: testUserAEmail,
            password: rawPassword
        });
        if (loginRes.status === 200 && loginRes.body?.token) {
            tokenA = loginRes.body.token;
            results.push({ test: "User Login", passed: true, detail: "HTTP 200 with new valid JWT" });
        } else {
            results.push({ test: "User Login", passed: false, detail: loginRes.body?.error || `Status: ${loginRes.status}` });
        }
    } catch (e) {
        results.push({ test: "User Login", passed: false, detail: e.message });
    }

    // Test 8: Protected Route Access Without Token
    try {
        const noAuthRes = await makeRequest("GET", "/api/profile");
        if (noAuthRes.status === 401) {
            results.push({ test: "Route Protection (No Token)", passed: true, detail: "HTTP 401 Access Denied" });
        } else {
            results.push({ test: "Route Protection (No Token)", passed: false, detail: `Status: ${noAuthRes.status}` });
        }
    } catch (e) {
        results.push({ test: "Route Protection (No Token)", passed: false, detail: e.message });
    }

    // Test 9: Profile Retrieval with Token
    try {
        const profRes = await makeRequest("GET", "/api/profile", null, tokenA);
        if (profRes.status === 200 && profRes.body?.email === testUserAEmail) {
            results.push({ test: "Profile Access (Authenticated)", passed: true, detail: `Profile loaded: ${profRes.body.full_name}` });
        } else {
            results.push({ test: "Profile Access (Authenticated)", passed: false, detail: `Status: ${profRes.status}` });
        }
    } catch (e) {
        results.push({ test: "Profile Access (Authenticated)", passed: false, detail: e.message });
    }

    // Test 10: Create User B and verify complete data isolation
    try {
        const regB = await makeRequest("POST", "/api/auth/register", {
            full_name: "Bob Tester",
            email: testUserBEmail,
            password: rawPassword
        });
        tokenB = regB.body.token;
        userBId = regB.body.user.id;

        // User A adds a meal
        await makeRequest("POST", "/api/meals/add", {
            name: "Alice Private Salmon",
            calories: 450,
            protein: 40,
            carbs: 10,
            fats: 20,
            meal_type: "dinner"
        }, tokenA);

        // User B fetches meals
        const mealsBRes = await makeRequest("GET", "/api/meals", null, tokenB);
        const mealsB = Array.isArray(mealsBRes.body) ? mealsBRes.body : [];
        const hasAlicesMeal = mealsB.some(m => m.name === "Alice Private Salmon");

        if (!hasAlicesMeal) {
            results.push({ test: "User Data Isolation", passed: true, detail: "User B cannot see User A's private data" });
        } else {
            results.push({ test: "User Data Isolation", passed: false, detail: "Leak detected: User B accessed User A's meal" });
        }
    } catch (e) {
        results.push({ test: "User Data Isolation", passed: false, detail: e.message });
    }

    // Clean up temporary test accounts
    try {
        await User.deleteMany({ email: { $in: [testUserAEmail, testUserBEmail] } });
        await Meal.deleteMany({ user: { $in: [userAId, userBId] } });
    } catch (e) {}

    console.log("\n=================================================");
    console.log("📊 AUTHENTICATION AUDIT SUMMARY");
    console.log("=================================================");
    let allPassed = true;
    for (const r of results) {
        const icon = r.passed ? "✅ PASS" : "❌ FAIL";
        if (!r.passed) allPassed = false;
        console.log(`${icon} | ${r.test.padEnd(36)} | ${r.detail}`);
    }
    console.log("=================================================");
    console.log(allPassed ? "🎉 ALL AUTHENTICATION TESTS PASSED!" : "⚠️ SOME AUTH TESTS FAILED");
    console.log("=================================================\n");

    if (server.closeAllConnections) server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    await mongoose.connection.close();
    process.exit(allPassed ? 0 : 1);
}

runAuthVerification();
