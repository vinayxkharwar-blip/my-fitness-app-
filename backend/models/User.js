const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    full_name: { type: String, default: "" },
    role: { type: String, default: "user" },
    age: { type: Number, default: 25 },
    height_cm: { type: Number, default: 175 },
    weight_kg: { type: Number, default: 70 },
    activity_level: { type: String, default: "moderate" },
    goal: { type: String, default: "maintain" },
    profile_image: { type: String, default: null }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model("User", userSchema);
