const express = require("express");
const router = express.Router();

const { addMeal, getMeals } = require("../controllers/mealController");

router.post("/add", addMeal);
router.post("/", addMeal);
router.get("/", getMeals);

module.exports = router;
