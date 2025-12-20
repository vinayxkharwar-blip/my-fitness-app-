const db = require("../database/sqlite_db");

// ADD TO CART
exports.addToCart = (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    const sql = `
        INSERT INTO cart_items (user_id, product_id, quantity)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + ?
    `;

    db.query(sql, [user_id, product_id, quantity, quantity], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json({ msg: "Item added to cart!" });
    });
};

// GET CART ITEMS FOR USER
exports.getCart = (req, res) => {
    const user_id = req.params.user_id;

    const sql = `
        SELECT c.cart_id, c.quantity,
               p.product_id, p.name, p.price, p.image_url, p.description
        FROM cart_items c
        JOIN products p ON c.product_id = p.product_id
        WHERE c.user_id = ?
    `;

    db.query(sql, [user_id], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json(result);
    });
};

// REMOVE ITEM FROM CART
exports.removeFromCart = (req, res) => {
    const cart_id = req.params.cart_id;

    const sql = "DELETE FROM cart_items WHERE cart_id = ?";

    db.query(sql, [cart_id], (err) => {
        if (err) return res.status(500).json(err);

        res.status(200).json({ msg: "Item removed from cart!" });
    });
};
