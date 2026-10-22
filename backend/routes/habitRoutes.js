const express = require("express");
const router = express.Router();

const { addHabitLog, getHabitLogs, getHabits, createHabit } = require("../controllers/habitController");

router.post("/add", addHabitLog);
router.post("/create", createHabit);
router.get("/list", getHabits);
router.get("/", getHabitLogs);
router.get("/test", (req, res) => {
    res.send("Habits route working!");
});

module.exports = router;