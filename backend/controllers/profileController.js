const db = require("../database/db");

// GET PROFILE
exports.getUserProfile = (req, res) => {
    const USER_ID = "demo-user";
    const clerk_user_id = USER_ID;

    const sql = `
        SELECT age, weight_kg, height_cm, goal, activity_level, profile_image, updated_at
        FROM user_profiles
        WHERE clerk_user_id = ?
    `;

    db.query(sql, [clerk_user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.length === 0) {
            // Auto-create default profile for demo-user
            const insertSql = `
                INSERT INTO user_profiles (clerk_user_id, age, height_cm, weight_kg, activity_level, goal)
                VALUES (?, 30, 175, 70, 'moderate', 'maintain')
            `;
            db.query(insertSql, [clerk_user_id], (insertErr) => {
                if (insertErr) return res.status(500).json({ error: insertErr.message });
                
                return res.status(200).json({
                    age: 30,
                    weight_kg: 70,
                    height_cm: 175,
                    goal: 'maintain',
                    activity_level: 'moderate',
                    profile_image: null,
                    updated_at: new Date()
                });
            });
            return;
        }

        res.status(200).json(result[0]);
    });
};

// UPDATE PROFILE
exports.updateUserProfile = (req, res) => {
    const USER_ID = "demo-user";
    const clerk_user_id = USER_ID;
    const body = req.body;

    // Check if profile exists
    db.query("SELECT * FROM user_profiles WHERE clerk_user_id = ?", [clerk_user_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            // INSERT
            const sql = `
                INSERT INTO user_profiles (clerk_user_id, age, height_cm, weight_kg, activity_level, goal, profile_image)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const params = [
                clerk_user_id,
                body.age !== undefined ? body.age : null,
                body.height_cm !== undefined ? body.height_cm : null,
                body.weight_kg !== undefined ? body.weight_kg : null,
                body.activity_level !== undefined ? body.activity_level : null,
                body.goal !== undefined ? body.goal : null,
                body.profile_image !== undefined ? body.profile_image : null
            ];
            db.query(sql, params, (err, insertResult) => {
                if (err) {
                    console.error("INSERT Error in profile:", err);
                    return res.status(500).json({ error: err.message });
                }
                res.status(200).json({ msg: "Profile created successfully!" });
            });
        } else {
            // Partial UPDATE
            const updates = [];
            const params = [];

            const updatableFields = ['age', 'height_cm', 'weight_kg', 'activity_level', 'goal', 'profile_image'];

            for (const field of updatableFields) {
                if (body[field] !== undefined) {
                    updates.push(`${field} = ?`);
                    params.push(body[field]);
                }
            }

            if (updates.length === 0) {
                return res.status(200).json({ msg: "No fields to update." });
            }

            updates.push('updated_at = CURRENT_TIMESTAMP');
            params.push(clerk_user_id);

            const sql = `UPDATE user_profiles SET ${updates.join(', ')} WHERE clerk_user_id = ?`;

            db.query(sql, params, (err, updateResult) => {
                if (err) {
                    console.error("UPDATE Error in profile:", err);
                    return res.status(500).json({ error: err.message });
                }
                res.status(200).json({ msg: "Profile updated successfully!" });
            });
        }
    });
};

