const db = require("../database/db");

// CREATE BOOKING
exports.createBooking = (req, res) => {
    const clerk_user_id = req.auth.userId;
    const { trainer_id, session_date, status, notes } = req.body;

    const sql = `
        INSERT INTO bookings (clerk_user_id, trainer_id, session_date, status, notes)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [clerk_user_id, trainer_id, session_date, status, notes], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        return res.status(200).json({
            msg: "Booking created successfully!",
            booking_id: result.insertId
        });
    });
};

// GET USER BOOKINGS
exports.getUserBookings = (req, res) => {
    const clerk_user_id = req.auth.userId;

    const sql = `
        SELECT b.*, 
               t.name AS trainer_name, 
               t.specialty 
        FROM bookings b
        JOIN trainers t ON b.trainer_id = t.trainer_id
        WHERE b.clerk_user_id = ?
        ORDER BY b.session_date DESC
    `;

    db.query(sql, [clerk_user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json(result);
    });
};
