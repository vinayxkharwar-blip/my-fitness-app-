const db = require("../database/db");

// GET ALL TRAINERS
exports.getAllTrainers = (req, res) => {
    const sql = "SELECT * FROM trainers";

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json(result);
    });
};

// GET TRAINER DETAILS
exports.getTrainerDetails = (req, res) => {
    const trainer_id = req.params.trainer_id;

    const sql = "SELECT * FROM trainers WHERE trainer_id = ?";

    db.query(sql, [trainer_id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({ msg: "Trainer not found" });
        }

        res.status(200).json(result[0]);
    });
};
