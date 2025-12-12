const db = require("../database/db");

// GET PROFILE
exports.getUserProfile = (req, res) => {
    const user_id = req.params.user_id;

    const sql = `
        SELECT u.full_name, u.email, p.height_cm, p.weight_kg, 
               p.activity_level, p.goal
        FROM users u
        LEFT JOIN user_profiles p ON u.user_id = p.user_id
        WHERE u.user_id = ?
    `;

    db.query(sql, [user_id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(result[0]);
    });
};

// UPDATE PROFILE
exports.updateUserProfile = (req, res) => {
    const { user_id, height_cm, weight_kg, activity_level, goal } = req.body;

    const sql = `
        INSERT INTO user_profiles (user_id, height_cm, weight_kg, activity_level, goal)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            height_cm = VALUES(height_cm),
            weight_kg = VALUES(weight_kg),
            activity_level = VALUES(activity_level),
            goal = VALUES(goal)
    `;

    db.query(sql, [user_id, height_cm, weight_kg, activity_level, goal], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json({ msg: "Profile updated successfully!" });
    });
};
