const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true },
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
    meal_type: { type: String, default: "lunch" },
    image_url: { type: String, default: null },
    logged_at: { type: Date, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model("Meal", mealSchema);
