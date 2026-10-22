const Booking = require("../models/Booking");
const Trainer = require("../models/Trainer");

// CREATE BOOKING
exports.createBooking = async (req, res) => {
    try {
        const userId = req.user.id;
        const { trainer_id, session_date, status, notes } = req.body;

        if (!trainer_id || !session_date) {
            return res.status(400).json({ error: "trainer_id and session_date are required." });
        }

        const newBooking = await Booking.create({
            user: userId,
            trainer: trainer_id,
            session_date: new Date(session_date),
            status: status || "confirmed",
            notes: notes || ""
        });

        return res.status(200).json({
            msg: "Booking created successfully!",
            booking_id: newBooking._id,
            id: newBooking._id
        });
    } catch (err) {
        console.error("Create Booking Error:", err);
        return res.status(500).json({ error: err.message });
    }
};

// GET USER BOOKINGS
exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await Booking.find({ user: userId })
            .populate("trainer")
            .sort({ session_date: -1 });

        const formatted = bookings.map(b => ({
            booking_id: b._id,
            id: b._id,
            trainer_id: b.trainer ? b.trainer._id : b.trainer,
            trainer_name: b.trainer ? b.trainer.name : "Trainer",
            specialty: b.trainer ? b.trainer.specialty : "",
            session_date: b.session_date,
            status: b.status,
            notes: b.notes,
            created_at: b.createdAt
        }));

        res.status(200).json(formatted);
    } catch (err) {
        console.error("Get Bookings Error:", err);
        res.status(500).json({ error: err.message });
    }
};
