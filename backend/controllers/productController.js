const Product = require("../models/Product");

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        const formatted = products.map(p => ({
            product_id: p._id,
            id: p._id,
            name: p.name,
            description: p.description,
            price: p.price,
            category: p.category,
            image_url: p.image_url,
            stock: p.stock
        }));
        res.status(200).json(formatted);
    } catch (err) {
        console.error("Get Products Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// GET PRODUCT BY ID
exports.getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json({
            product_id: product._id,
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            image_url: product.image_url,
            stock: product.stock
        });
    } catch (err) {
        console.error("Get Product Details Error:", err);
        res.status(500).json({ error: err.message });
    }
};
