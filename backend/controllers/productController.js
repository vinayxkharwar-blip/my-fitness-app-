const db = require("../database/db");

// GET ALL PRODUCTS
exports.getProducts = (req, res) => {
    const sql = "SELECT * FROM products";

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json(result);
    });
};

// GET PRODUCT BY ID
exports.getProductById = (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM products WHERE product_id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json(result[0]);
    });
};
