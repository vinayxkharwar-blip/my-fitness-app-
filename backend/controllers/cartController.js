const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

// ADD TO CART
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { product_id, quantity } = req.body;
        const qty = Number(quantity) || 1;

        if (!product_id) {
            return res.status(400).json({ error: "product_id is required." });
        }

        let cartItem = await CartItem.findOne({ user: userId, product: product_id });
        if (cartItem) {
            cartItem.quantity += qty;
            await cartItem.save();
        } else {
            cartItem = await CartItem.create({
                user: userId,
                product: product_id,
                quantity: qty
            });
        }

        res.status(200).json({ msg: "Item added to cart!", cart_id: cartItem._id });
    } catch (err) {
        console.error("Add to Cart Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// GET CART ITEMS FOR USER
exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const items = await CartItem.find({ user: userId }).populate("product");

        const formatted = items.filter(item => item.product).map(item => ({
            cart_id: item._id,
            id: item._id,
            quantity: item.quantity,
            product_id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            image_url: item.product.image_url,
            description: item.product.description
        }));

        res.status(200).json(formatted);
    } catch (err) {
        console.error("Get Cart Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// REMOVE ITEM FROM CART
exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart_id = req.params.cart_id;

        const deleted = await CartItem.findOneAndDelete({ _id: cart_id, user: userId });
        if (!deleted) {
            return res.status(404).json({ error: "Cart item not found or unauthorized" });
        }

        res.status(200).json({ msg: "Item removed from cart!" });
    } catch (err) {
        console.error("Remove from Cart Error:", err);
        res.status(500).json({ error: err.message });
    }
};
