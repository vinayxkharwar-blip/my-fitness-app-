const Meal = require("../models/Meal");

// ADD MEAL
exports.addMeal = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, calories, protein, carbs, fats, meal_type, image_url } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Meal name is required." });
        }

        await Meal.create({
            user: userId,
            name,
            calories: Number(calories) || 0,
            protein: Number(protein) || 0,
            carbs: Number(carbs) || 0,
            fats: Number(fats) || 0,
            meal_type: meal_type || "lunch",
            image_url: image_url || null
        });

        res.status(200).json({ msg: "Meal added successfully!" });
    } catch (err) {
        console.error("Add Meal Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// GET MEALS
exports.getMeals = async (req, res) => {
    try {
        const userId = req.user.id;
        const meals = await Meal.find({ user: userId }).sort({ logged_at: -1 });

        // Map to match existing SQL response fields if needed
        const formatted = meals.map(m => ({
            meal_id: m._id,
            id: m._id,
            name: m.name,
            calories: m.calories,
            protein: m.protein,
            carbs: m.carbs,
            fats: m.fats,
            meal_type: m.meal_type,
            image_url: m.image_url,
            logged_at: m.logged_at
        }));

        res.status(200).json(formatted);
    } catch (err) {
        console.error("Get Meals Error:", err);
        res.status(500).json({ error: err.message });
    }
};
