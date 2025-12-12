const db = require("../database/db");

// ADD HABIT LOG
exports.addHabitLog = (req, res) => {
    const { user_id, habit_name, status } = req.body;

    const sql = `
        INSERT INTO user_habits_logs (user_id, habit_name, status)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [user_id, habit_name, status], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json({ msg: "Habit log added successfully!" });
    });
};

// GET HABIT LOGS
exports.getHabitLogs = (req, res) => {
    const user_id = req.params.user_id;

    const sql = `
        SELECT * FROM user_habits_logs
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [user_id], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json(result);
    });
};
