const db = require("../database/db");

// ADD MEAL
exports.addMeal = (req, res) => {
    const clerk_user_id = req.auth.userId;
    const { name, calories, protein, carbs, fats, meal_type } = req.body;

    const sql = `
        INSERT INTO meals 
        (clerk_user_id, name, calories, protein, carbs, fats, meal_type)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [clerk_user_id, name, calories, protein, carbs, fats, meal_type], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json({ msg: "Meal added successfully!" });
    });
};

// GET MEALS
exports.getMeals = (req, res) => {
    const clerk_user_id = req.auth.userId;

    const sql = `SELECT * FROM meals WHERE clerk_user_id = ? ORDER BY logged_at DESC`;

    db.query(sql, [clerk_user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json(result);
    });
};
