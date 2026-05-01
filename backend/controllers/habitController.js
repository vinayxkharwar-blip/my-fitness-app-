const db = require("../database/db");

// ADD HABIT LOG
// Note: Assumes `habit_id` is passed, as the new schema uses habit_logs (log_id, habit_id, completed_at)
// However, adding a generic habit first might be needed if not existing. 
// For now, adapting the existing logic to the new `habits` and `habit_logs` tables
exports.addHabitLog = (req, res) => {
    const USER_ID = "demo-user";
    const clerk_user_id = USER_ID;
    const { habit_id } = req.body;

    const sql = `
        INSERT INTO habit_logs (habit_id)
        VALUES (?)
    `;

    db.query(sql, [habit_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json({ msg: "Habit log added successfully!" });
    });
};

// GET HABIT LOGS
exports.getHabitLogs = (req, res) => {
    const USER_ID = "demo-user";
    const clerk_user_id = USER_ID;

    // Join to ensure habits belong to the requesting user
    const sql = `
        SELECT hl.*, h.name as habit_name FROM habit_logs hl
        JOIN habits h ON hl.habit_id = h.habit_id
        WHERE h.clerk_user_id = ?
        ORDER BY hl.completed_at DESC
    `;

    db.query(sql, [clerk_user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json(result);
    });
};
