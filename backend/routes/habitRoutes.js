const express = require("express");
const router = express.Router();

const { addHabitLog, getHabitLogs } = require("../controllers/habitController");

router.post("/add", addHabitLog);
router.get("/", getHabitLogs);
router.get("/test", (req, res) => {
    res.send("Habits route working!");
});

module.exports = router;