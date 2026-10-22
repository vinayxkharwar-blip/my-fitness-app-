const Trainer = require("../models/Trainer");

// GET ALL TRAINERS
exports.getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find().sort({ rating: -1 });
        const formatted = trainers.map(t => ({
            trainer_id: t._id,
            id: t._id,
            name: t.name,
            specialty: t.specialty,
            bio: t.bio,
            rating: t.rating,
            price: t.price,
            image_url: t.image_url
        }));
        res.status(200).json(formatted);
    } catch (err) {
        console.error("Get Trainers Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// GET TRAINER DETAILS
exports.getTrainerDetails = async (req, res) => {
    try {
        const trainer_id = req.params.trainer_id;
        const trainer = await Trainer.findById(trainer_id);

        if (!trainer) {
            return res.status(404).json({ msg: "Trainer not found" });
        }

        res.status(200).json({
            trainer_id: trainer._id,
            id: trainer._id,
            name: trainer.name,
            specialty: trainer.specialty,
            bio: trainer.bio,
            rating: trainer.rating,
            price: trainer.price,
            image_url: trainer.image_url
        });
    } catch (err) {
        console.error("Get Trainer Details Error:", err);
        res.status(500).json({ error: err.message });
    }
};
