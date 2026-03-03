const express = require("express");
const router = express.Router();

const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");

router.post("/add", addToCart);
router.get("/", getCart);
router.delete("/remove/:cart_id", removeFromCart);

module.exports = router;
