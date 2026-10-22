const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const dns = require("dns");

// Fix Windows Node.js DNS SRV resolution issue for MongoDB Atlas (querySrv ECONNREFUSED)
try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
    // Ignore if system restricts dns.setServers
}

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fitsnap";
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("Successfully connected to MongoDB:", mongoURI.split("@").pop());
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
    }
};

module.exports = {
    connectDB,
    connection: mongoose.connection
};
