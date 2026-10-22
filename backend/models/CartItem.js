const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1, min: 1 },
    added_at: { type: Date, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model("CartItem", cartItemSchema);
