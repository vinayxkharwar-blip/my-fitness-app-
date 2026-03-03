const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

const app = express();

// Secure HTTP headers
app.use(helmet());

// Logging
app.use(morgan("dev"));

app.use(cors({
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true,
    methods: "GET, POST, PUT, DELETE, OPTIONS"
}));

// JSON Body Parser
app.use(express.json({ limit: "50mb" }));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// ------------------------------------------------------
// MAIN ROUTES (Protected by Clerk)
// ------------------------------------------------------
const isDevAndMissingKey = process.env.CLERK_SECRET_KEY === 'your_clerk_secret_key' || !process.env.CLERK_SECRET_KEY;

const requireAuth = (req, res, next) => {
    if (isDevAndMissingKey) {
        // Bypass auth for local development if the real key is missing
        req.auth = { userId: "dev_user_123" };
        return next();
    }
    // Otherwise use actual Clerk middleware
    return ClerkExpressRequireAuth({})(req, res, next);
};

app.use("/api/profile", requireAuth, require("./routes/profileRoutes"));
app.use("/api/meals", requireAuth, require("./routes/mealRoutes"));
app.use("/api/water", requireAuth, require("./routes/waterRoutes"));
app.use("/api/habits", requireAuth, require("./routes/habitRoutes"));
app.use("/api/trainers", requireAuth, require("./routes/trainerRoutes"));
app.use("/api/bookings", requireAuth, require("./routes/bookingRoutes"));
app.use("/api/chat", requireAuth, require("./routes/chatRoutes"));
app.use("/api/products", requireAuth, require("./routes/productRoutes"));
app.use("/api/cart", requireAuth, require("./routes/cartRoutes"));
app.use("/api/nutrition", requireAuth, require("./routes/nutritionRoutes"));

// ------------------------------------------------------
// AI ANALYZE ROUTE
// ------------------------------------------------------
const analyzeRoutes = require("./routes/analyze");
app.use("/api", requireAuth, analyzeRoutes);



// ------------------------------------------------------
// DEFAULT ROOT ROUTE
// ------------------------------------------------------
app.get("/", (req, res) => {
    res.send("AI Fitness Backend Running!");
});

// ------------------------------------------------------
// GLOBAL 404 HANDLER
// ------------------------------------------------------
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});

// ------------------------------------------------------
// GLOBAL ERROR HANDLER
// ------------------------------------------------------
app.use((err, req, res, next) => {
    console.error(err.stack);

    // Check if it's a Clerk auth error
    if (err.message === 'Unauthenticated' || err.statusCode === 401) {
        return res.status(401).json({ error: "Unauthenticated: Valid session token required." });
    }

    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error"
    });
});

// ------------------------------------------------------
// START SERVER
// ------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
