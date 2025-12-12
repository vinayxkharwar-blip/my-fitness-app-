const express = require("express");
const router = express.Router();

const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");

router.post("/add", addToCart);
router.get("/:user_id", getCart);
router.delete("/:cart_id", removeFromCart);

module.exports = router;
