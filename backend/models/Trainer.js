const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    bio: { type: String, default: "" },
    rating: { type: Number, default: 4.8 },
    price: { type: Number, default: 50 },
    image_url: { type: String, default: "" }
}, {
    timestamps: true
});

module.exports = mongoose.model("Trainer", trainerSchema);
