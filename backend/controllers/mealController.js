const db = require("../database/sqlite_db");

// ADD MEAL
exports.addMeal = (req, res) => {
    const { user_id, meal_type, food_items, calories, protein, carbs, fats, image_url } = req.body;

    const sql = `
        INSERT INTO user_meals 
        (user_id, meal_type, food_items, calories, protein, carbs, fats, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [user_id, meal_type, food_items, calories, protein, carbs, fats, image_url], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json({ msg: "Meal added successfully!" });
    });
};

// GET MEALS
exports.getMeals = (req, res) => {
    const user_id = req.params.user_id;

    const sql = `SELECT * FROM user_meals WHERE user_id = ? ORDER BY created_at DESC`;

    db.query(sql, [user_id], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json(result);
    });
};
