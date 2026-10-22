const WaterLog = require("../models/WaterLog");

// ADD WATER LOG
exports.addWaterLog = async (req, res) => {
    try {
        const userId = req.user.id;
        const { amount_ml } = req.body;

        if (!amount_ml) {
            return res.status(400).json({ error: "Amount in ml is required" });
        }

        await WaterLog.create({
            user: userId,
            amount_ml: Number(amount_ml)
        });

        res.status(200).json({ msg: "Water log added successfully!" });
    } catch (err) {
        console.error("Add Water Log Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// GET WATER LOGS
exports.getWaterLogs = async (req, res) => {
    try {
        const userId = req.user.id;
        const logs = await WaterLog.find({ user: userId }).sort({ logged_at: -1 });

        const formatted = logs.map(l => ({
            log_id: l._id,
            id: l._id,
            amount_ml: l.amount_ml,
            logged_at: l.logged_at
        }));

        res.status(200).json(formatted);
    } catch (err) {
        console.error("Get Water Logs Error:", err);
        res.status(500).json({ error: err.message });
    }
};
