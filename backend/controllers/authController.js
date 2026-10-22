const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id.toString(), email: user.email, role: user.role || "user" },
        process.env.JWT_SECRET || "fitsnap_secure_default_secret_key",
        { expiresIn: "30d" }
    );
};

exports.registerUser = async (req, res) => {
    try {
        const { full_name, name, email, password, age, height_cm, weight_kg, goal, activity_level } = req.body;
        const displayName = (full_name || name || "").trim();

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({ error: "Please provide a valid email address." });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long." });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            return res.status(400).json({ error: "An account with this email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            full_name: displayName,
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            age: age || 25,
            height_cm: height_cm || 175,
            weight_kg: weight_kg || 70,
            goal: goal || "maintain",
            activity_level: activity_level || "moderate"
        });

        const token = generateToken(newUser);

        res.status(201).json({
            msg: "User registered successfully!",
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                full_name: newUser.full_name,
                goal: newUser.goal,
                height_cm: newUser.height_cm,
                weight_kg: newUser.weight_kg
            }
        });
    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ error: err.message || "Server error registering user." });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({ error: "Please provide a valid email address." });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const token = generateToken(user);

        res.status(200).json({
            msg: "Login successful!",
            token,
            user: {
                id: user._id,
                email: user.email,
                full_name: user.full_name,
                goal: user.goal,
                height_cm: user.height_cm,
                weight_kg: user.weight_kg
            }
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: err.message || "Server error logging in." });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
