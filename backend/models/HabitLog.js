const mongoose = require("mongoose");

const habitLogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    habit: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true, index: true },
    completed_at: { type: Date, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model("HabitLog", habitLogSchema);
