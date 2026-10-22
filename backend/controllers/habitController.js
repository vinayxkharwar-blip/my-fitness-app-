const Habit = require("../models/Habit");
const HabitLog = require("../models/HabitLog");

// GET ALL HABITS FOR USER
exports.getHabits = async (req, res) => {
    try {
        const userId = req.user.id;
        const habits = await Habit.find({ user: userId }).sort({ created_at: -1 });
        res.status(200).json(habits.map(h => ({
            habit_id: h._id,
            id: h._id,
            name: h.name,
            frequency: h.frequency,
            streak: h.streak,
            created_at: h.created_at
        })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE A HABIT
exports.createHabit = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, frequency } = req.body;
        if (!name) return res.status(400).json({ error: "Habit name is required." });

        const habit = await Habit.create({
            user: userId,
            name,
            frequency: frequency || "daily",
            streak: 0
        });

        res.status(201).json({ msg: "Habit created successfully!", habit_id: habit._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ADD HABIT LOG
exports.addHabitLog = async (req, res) => {
    try {
        const userId = req.user.id;
        const { habit_id } = req.body;

        if (!habit_id) {
            return res.status(400).json({ error: "habit_id is required." });
        }

        const habit = await Habit.findOne({ _id: habit_id, user: userId });
        if (!habit) {
            return res.status(404).json({ error: "Habit not found for this user." });
        }

        await HabitLog.create({
            user: userId,
            habit: habit_id
        });

        habit.streak += 1;
        await habit.save();

        res.status(200).json({ msg: "Habit log added successfully!" });
    } catch (err) {
        console.error("Add Habit Log Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// GET HABIT LOGS
exports.getHabitLogs = async (req, res) => {
    try {
        const userId = req.user.id;
        const logs = await HabitLog.find({ user: userId })
            .populate("habit", "name")
            .sort({ completed_at: -1 });

        const formatted = logs.map(l => ({
            log_id: l._id,
            id: l._id,
            habit_id: l.habit ? l.habit._id : null,
            habit_name: l.habit ? l.habit.name : "Habit",
            completed_at: l.completed_at
        }));

        res.status(200).json(formatted);
    } catch (err) {
        console.error("Get Habit Logs Error:", err);
        res.status(500).json({ error: err.message });
    }
};
