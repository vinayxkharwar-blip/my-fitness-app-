const db = require("../database/sqlite_db");

// SEND MESSAGE
exports.sendMessage = (req, res) => {
    const { sender_id, receiver_id, message } = req.body;

    const sql = `
        INSERT INTO chat_messages (sender_id, receiver_id, message)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [sender_id, receiver_id, message], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json({
            msg: "Message sent!",
            message_id: result.insertId
        });
    });
};

// GET CHAT BETWEEN USER & TRAINER
exports.getConversation = (req, res) => {
    const { user_id, trainer_id } = req.params;

    const sql = `
        SELECT * FROM chat_messages
        WHERE (sender_id = ? AND receiver_id = ?)
           OR (sender_id = ? AND receiver_id = ?)
        ORDER BY sent_at ASC
    `;

    db.query(sql, [user_id, trainer_id, trainer_id, user_id], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json(result);
    });
};
