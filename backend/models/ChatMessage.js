const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    role: { type: String, enum: ["user", "assistant", "model"], required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
