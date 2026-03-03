const db = require("../database/db");

// ADD WATER LOG
exports.addWaterLog = (req, res) => {
    const clerk_user_id = req.auth.userId;
    const { amount_ml } = req.body;

    const sql = `
        INSERT INTO water_logs (clerk_user_id, amount_ml)
        VALUES (?, ?)
    `;

    db.query(sql, [clerk_user_id, amount_ml], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json({ msg: "Water log added successfully!" });
    });
};

// GET WATER LOGS
exports.getWaterLogs = (req, res) => {
    const clerk_user_id = req.auth.userId;

    const sql = `
        SELECT * FROM water_logs 
        WHERE clerk_user_id = ?
        ORDER BY logged_at DESC
    `;

    db.query(sql, [clerk_user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json(result);
    });
};
