const mongoose = require("mongoose");

const waterLogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    amount_ml: { type: Number, required: true },
    logged_at: { type: Date, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model("WaterLog", waterLogSchema);
