const db = require("../database/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = (req, res) => {
    const { full_name, email, password, role = 'user' } = req.body;

    if (!full_name || !email || !password) {
        return res.status(400).json({ msg: "All fields required" });
    }

    const hashedPass = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)";
    console.log("DB Object in Controller:", db);

    db.query(sql, [full_name, email, hashedPass, role], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json({ msg: "User registered successfully!" });
    });
};
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Email & Password required" });
    }

    const sql = `
        SELECT u.*, p.goal, p.height_cm, p.weight_kg 
        FROM users u 
        LEFT JOIN user_profiles p ON u.user_id = p.user_id 
        WHERE u.email = ?
    `;

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

        // Check if profile setup is complete (has goal and height/weight)
        const isProfileComplete = !!(user.goal && user.height_cm && user.weight_kg);

        // Generate JWT Token
        const token = jwt.sign(
            { id: user.user_id, email: user.email, role: user.role || 'user' },
            process.env.JWT_SECRET || "default_dev_secret",
            { expiresIn: "30d" }
        );

        res.status(200).json({
            msg: "Login successful!",
            token,
            user: {
                id: user.user_id,
                full_name: user.full_name,
                email: user.email,
                role: user.role || 'user',
                is_profile_complete: isProfileComplete
            }
        });
    });
};

exports.socialLogin = (req, res) => {
    const { email, full_name, provider, role = 'user' } = req.body;

    if (!email || !full_name) {
        return res.status(400).json({ msg: "Email and Name required for social login" });
    }

    const checkSql = "SELECT * FROM users WHERE email = ?";
    db.query(checkSql, [email], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length > 0) {
            // User exists, log them in
            const user = result[0];

            // Re-use logic to check profile
            const checkProfileSql = "SELECT * FROM user_profiles WHERE user_id = ?";
            db.query(checkProfileSql, [user.user_id], (err, profileResult) => {
                const isProfileComplete = profileResult && profileResult.length > 0 && !!(profileResult[0].goal && profileResult[0].height_cm);

                const token = jwt.sign(
                    { id: user.user_id, email: user.email, role: user.role || 'user' },
                    process.env.JWT_SECRET || "default_dev_secret",
                    { expiresIn: "30d" }
                );

                return res.status(200).json({
                    msg: `Logged in with ${provider}`,
                    token,
                    user: {
                        id: user.user_id,
                        full_name: user.full_name,
                        email: user.email,
                        role: user.role || 'user',
                        is_profile_complete: isProfileComplete
                    }
                });
            });

        } else {
            // Register new user
            const password_hash = "SOCIAL_LOGIN_PLACEHOLDER";
            const insertSql = "INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)";

            db.query(insertSql, [full_name, email, password_hash, role], (err, result) => {
                if (err) return res.status(500).json(err);

                db.query("SELECT * FROM users WHERE email = ?", [email], (err, newUsers) => {
                    const newUser = newUsers[0];
                    const token = jwt.sign(
                        { id: newUser.user_id, email: newUser.email, role: newUser.role || 'user' },
                        process.env.JWT_SECRET || "default_dev_secret",
                        { expiresIn: "30d" }
                    );

                    return res.status(200).json({
                        msg: `Registered with ${provider}`,
                        token,
                        user: {
                            id: newUser.user_id,
                            full_name: newUser.full_name,
                            email: newUser.email,
                            role: newUser.role || 'user',
                            is_profile_complete: false
                        }
                    });
                });
            });
        }
    });
};
