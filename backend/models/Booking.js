const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", required: true },
    session_date: { type: Date, required: true },
    status: { type: String, default: "confirmed" },
    notes: { type: String, default: "" }
}, {
    timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);
