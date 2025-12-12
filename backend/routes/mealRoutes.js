const express = require("express");
const router = express.Router();

const { addMeal, getMeals } = require("../controllers/mealController");

router.post("/add", addMeal);
router.get("/:user_id", getMeals);

module.exports = router;
