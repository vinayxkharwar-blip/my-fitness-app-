const db = require("../database/db");

// ADD TO CART
exports.addToCart = (req, res) => {
    const USER_ID = "demo-user";
    const clerk_user_id = USER_ID;
    const { product_id, quantity } = req.body;

    const sql = `
        INSERT INTO cart_items (clerk_user_id, product_id, quantity)
        VALUES (?, ?, ?)
        ON CONFLICT(clerk_user_id, product_id) DO UPDATE SET quantity = cart_items.quantity + excluded.quantity
    `;

    db.query(sql, [clerk_user_id, product_id, quantity], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json({ msg: "Item added to cart!" });
    });
};

// GET CART ITEMS FOR USER
exports.getCart = (req, res) => {
    const USER_ID = "demo-user";
    const clerk_user_id = USER_ID;

    const sql = `
        SELECT c.cart_id, c.quantity,
               p.product_id, p.name, p.price, p.image_url, p.description
        FROM cart_items c
        JOIN products p ON c.product_id = p.product_id
        WHERE c.clerk_user_id = ?
    `;

    db.query(sql, [clerk_user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json(result);
    });
};

// REMOVE ITEM FROM CART
exports.removeFromCart = (req, res) => {
    // Optionally we could also verify ownership of cart_id here before deleting
    const cart_id = req.params.cart_id;

    const sql = "DELETE FROM cart_items WHERE cart_id = ?";

    db.query(sql, [cart_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json({ msg: "Item removed from cart!" });
    });
};
