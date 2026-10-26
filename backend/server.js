const path = require("path");
const express = require("express");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { connectDB } = require("./database/db");
const authMiddleware = require("./middleware/auth");

const app = express();

// 1. Connect to MongoDB
connectDB();

// 2. Security HTTP headers
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 3. Request Logging
app.use(morgan("dev"));

// 4. CORS configuration
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:8080",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8080",
    ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",").map(o => o.trim()) : [])
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
            return callback(null, true);
        }
        callback(null, true); // Permissive for local development
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));

// 5. JSON Body Parser with 10MB safety limit
app.use(express.json({ limit: "10mb" }));

// 6. Global Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000,
    message: { error: "Too many requests from this IP, please try again later." }
});
app.use(limiter);

// ------------------------------------------------------
// PUBLIC ROUTES
// ------------------------------------------------------
app.use("/api/auth", require("./routes/authRoutes"));

// Default root route
app.get("/", (req, res) => {
    res.json({ message: "FitSnap AI Backend running with MongoDB & OpenAI!" });
});

// ------------------------------------------------------
// PROTECTED ROUTES (Requires valid JWT via authMiddleware)
// ------------------------------------------------------
app.use("/api/profile", authMiddleware, require("./routes/profileRoutes"));
app.use("/api/meals", authMiddleware, require("./routes/mealRoutes"));
app.use("/api/water", authMiddleware, require("./routes/waterRoutes"));
app.use("/api/habits", authMiddleware, require("./routes/habitRoutes"));
app.use("/api/trainers", authMiddleware, require("./routes/trainerRoutes"));
app.use("/api/bookings", authMiddleware, require("./routes/bookingRoutes"));
app.use("/api/chat", authMiddleware, require("./routes/chatRoutes"));
app.use("/api/products", authMiddleware, require("./routes/productRoutes"));
app.use("/api/cart", authMiddleware, require("./routes/cartRoutes"));
app.use("/api/nutrition", authMiddleware, require("./routes/nutritionRoutes"));

// AI Vision & Coach Routes
app.use("/api", authMiddleware, require("./routes/analyze"));

// ------------------------------------------------------
// 404 HANDLER
// ------------------------------------------------------
app.use((req, res) => {
    res.status(404).json({ error: "API route not found" });
});

// ------------------------------------------------------
// GLOBAL ERROR HANDLER
// ------------------------------------------------------
app.use((err, req, res, next) => {
    console.error("Global Server Error:", err.stack);
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
