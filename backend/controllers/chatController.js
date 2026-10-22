const ChatMessage = require("../models/ChatMessage");
const AIService = require("../services/aiService");

// SEND MESSAGE & CHAT WITH COACH
exports.sendMessage = async (req, res) => {
    try {
        const userId = req.user.id;
        const text = req.body.message || req.body.content;

        if (!text) {
            return res.status(400).json({ error: "Message or content is required." });
        }

        // If the request specifically came as a coach query (message property or /api/chat)
        if (req.body.message || !req.body.role) {
            // Save user query
            await ChatMessage.create({
                user: userId,
                role: "user",
                content: text
            });

            // Generate AI Coach response
            const aiReply = await AIService.chatWithCoach(text);

            // Save coach reply
            await ChatMessage.create({
                user: userId,
                role: "assistant",
                content: aiReply
            });

            return res.status(200).json({ reply: aiReply, message: aiReply });
        }

        // Standard manual message log
        const msg = await ChatMessage.create({
            user: userId,
            role: req.body.role || "user",
            content: text
        });

        res.status(200).json({
            msg: "Message sent!",
            message_id: msg._id,
            id: msg._id
        });
    } catch (err) {
        console.error("Send Message Error:", err);
        res.status(500).json({ error: err.message || "Failed to process chat" });
    }
};

// GET CHAT MESSAGES
exports.getConversation = async (req, res) => {
    try {
        const userId = req.user.id;
        const messages = await ChatMessage.find({ user: userId }).sort({ created_at: 1 });

        const formatted = messages.map(m => ({
            message_id: m._id,
            id: m._id,
            role: m.role,
            content: m.content,
            created_at: m.created_at
        }));

        res.status(200).json(formatted);
    } catch (err) {
        console.error("Get Conversation Error:", err);
        res.status(500).json({ error: err.message });
    }
};
