const CalorieService = require('../services/calorieService');

class NutritionController {
    /**
     * Calculate daily needs based on physical stats
     * POST /api/nutrition/calculate
     */
    static calculateNeeds(req, res) {
        try {
            const { weight, height, age, gender, activity } = req.body;

            if (!weight || !height || !age || !gender) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const result = CalorieService.calculateDailyNeeds(weight, height, age, gender, activity);

            res.json({
                success: true,
                data: result
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error calculating needs" });
        }
    }
}

module.exports = NutritionController;
