const db = require("../database/sqlite_db");

// CREATE BOOKING
exports.createBooking = (req, res) => {
    const { user_id, trainer_id, booking_date, status } = req.body;

    const sql = `
        INSERT INTO trainer_bookings (user_id, trainer_id, booking_date, status)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [user_id, trainer_id, booking_date, status], (err, result) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json({
            msg: "Booking created successfully!",
            booking_id: result.insertId
        });
    });
};

// GET USER BOOKINGS
exports.getUserBookings = (req, res) => {
    const user_id = req.params.user_id;

    const sql = `
        SELECT b.*, 
               t.full_name AS trainer_name, 
               t.specialty 
        FROM trainer_bookings b
        JOIN trainers t ON b.trainer_id = t.trainer_id
        WHERE b.user_id = ?
        ORDER BY b.booking_date DESC
    `;

    db.query(sql, [user_id], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json(result);
    });
};
