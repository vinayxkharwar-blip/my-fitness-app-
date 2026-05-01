const db = require("../database/db");

// SEND MESSAGE
exports.sendMessage = (req, res) => {
    const USER_ID = "demo-user";
    const clerk_user_id = USER_ID;
    const { role, content } = req.body;

    const sql = `
        INSERT INTO chat_messages (clerk_user_id, role, content)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [clerk_user_id, role, content], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json({
            msg: "Message sent!",
            message_id: result.insertId
        });
    });
};

// GET CHAT MESSAGES
// Simplified to just fetch messages for the user. We can adjust if trainer-specific chats are needed later
exports.getConversation = (req, res) => {
    const USER_ID = "demo-user";
    const clerk_user_id = USER_ID;

    const sql = `
        SELECT * FROM chat_messages
        WHERE clerk_user_id = ?
        ORDER BY created_at ASC
    `;

    db.query(sql, [clerk_user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json(result);
    });
};
