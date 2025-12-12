const db = require("../database/db");
const bcrypt = require("bcryptjs");

exports.registerUser = (req, res) => {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
        return res.status(400).json({ msg: "All fields required" });
    }

    const hashedPass = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)";

    db.query(sql, [full_name, email, hashedPass], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json({ msg: "User registered successfully!" });
    });
};
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Email & Password required" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(401).json({ msg: "User not found" });
        }

        const user = result[0];

        const isPassCorrect = bcrypt.compareSync(password, user.password_hash);

        if (!isPassCorrect) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        res.status(200).json({
            msg: "Login successful!",
            user: {
                id: user.user_id,
                full_name: user.full_name,
                email: user.email
            }
        });
    });
};
