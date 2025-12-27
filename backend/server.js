const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

// ✅ CORS (Only once)
// ✅ CORS (Only once)
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:8080", "http://10.26.96.172:5173", "http://10.26.96.172:8080"],
    credentials: true,
    methods: "GET, POST, PUT, DELETE"
}));

// ✅ JSON Body Parser
app.use(express.json({ limit: "50mb" }));

// ✅ Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ------------------------------------------------------
// TEST ROUTE
// ------------------------------------------------------
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend connected successfully!" });
});

// ------------------------------------------------------
// MAIN ROUTES
// ------------------------------------------------------
app.use("/auth", require("./routes/authRoutes"));
app.use("/profile", require("./routes/profileRoutes"));
app.use("/meals", require("./routes/mealRoutes"));
app.use("/water", require("./routes/waterRoutes"));
app.use("/habits", require("./routes/habitRoutes"));
app.use("/trainers", require("./routes/trainerRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));
app.use("/chat", require("./routes/chatRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/api/nutrition", require("./routes/nutritionRoutes"));

// ------------------------------------------------------
// ⭐ NEW AI ANALYZE ROUTE (Mock AI Nutrition Analysis)
// ------------------------------------------------------
const analyzeRoutes = require("./routes/analyze");
app.use("/api", analyzeRoutes);   // ← IMPORTANT

// ------------------------------------------------------
// DEFAULT ROOT ROUTE
// ------------------------------------------------------
app.get("/", (req, res) => {
    res.send("AI Fitness Backend Running!");
});

// ------------------------------------------------------
// START SERVER
// ------------------------------------------------------
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
