const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true },
    frequency: { type: String, default: "daily" },
    streak: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model("Habit", habitSchema);
