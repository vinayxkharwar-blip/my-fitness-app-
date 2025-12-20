const db = require("../database/sqlite_db");

// GET PROFILE
exports.getUserProfile = (req, res) => {
    const user_id = req.params.user_id;

    const sql = `
        SELECT u.full_name, u.email, p.height_cm, p.weight_kg, 
               p.activity_level, p.goal, p.profile_image
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
    const { user_id, height_cm, weight_kg, activity_level, goal, profile_image } = req.body;

    if (profile_image) {
        console.log(`Received profile image update for user ${user_id}. Size: ${profile_image.length} chars`);
    }

    const sql = `
        INSERT INTO user_profiles (user_id, height_cm, weight_kg, activity_level, goal, profile_image)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET
            height_cm = COALESCE(excluded.height_cm, height_cm),
            weight_kg = COALESCE(excluded.weight_kg, weight_kg),
            activity_level = COALESCE(excluded.activity_level, activity_level),
            goal = COALESCE(excluded.goal, goal),
            profile_image = COALESCE(excluded.profile_image, profile_image)
    `;

    db.query(sql, [user_id, height_cm, weight_kg, activity_level, goal, profile_image], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json({ msg: "Profile updated successfully!" });
    });
};
