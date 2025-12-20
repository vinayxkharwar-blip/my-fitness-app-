const db = require("../database/sqlite_db");

// ADD WATER LOG
exports.addWaterLog = (req, res) => {
    const { user_id, amount_ml } = req.body;

    const sql = `
        INSERT INTO user_water_logs (user_id, amount_ml)
        VALUES (?, ?)
    `;

    db.query(sql, [user_id, amount_ml], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json({ msg: "Water log added successfully!" });
    });
};

// GET WATER LOGS
exports.getWaterLogs = (req, res) => {
    const user_id = req.params.user_id;

    const sql = `
        SELECT * FROM user_water_logs 
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [user_id], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json(result);
    });
};
