/**
 * Service for calculating Daily Calorie and Macro needs.
 * Uses Harris-Benedict equation.
 */

class CalorieService {
    /**
     * Calculate TDEE (Total Daily Energy Expenditure)
     * @param {number} weightKg 
     * @param {number} heightCm 
     * @param {number} age 
     * @param {string} gender 'male' | 'female'
     * @param {string} activityLevel 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
     */
    static calculateDailyNeeds(weightKg, heightCm, age, gender, activityLevel) {
        let bmr;

        // 1. Calculate BMR (Basal Metabolic Rate)
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
        }

        // 2. Activity Multipliers
        const multipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9
        };

        const tdee = Math.round(bmr * (multipliers[activityLevel] || 1.2));

        // 3. Macro Split (Standard 40/30/30)
        // Protein: 4 cal/g, Carbs: 4 cal/g, Fat: 9 cal/g
        return {
            calories: tdee,
            macros: {
                protein: Math.round((tdee * 0.30) / 4), // 30% Protein
                carbs: Math.round((tdee * 0.40) / 4),   // 40% Carbs
                fats: Math.round((tdee * 0.30) / 9)     // 30% Fats
            }
        };
    }
}

module.exports = CalorieService;
