const express = require('express');
const NutritionController = require('../controllers/nutritionController');

const router = express.Router();

router.post('/calculate', NutritionController.calculateNeeds);

module.exports = router;
