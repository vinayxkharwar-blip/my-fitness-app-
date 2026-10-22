const User = require("../models/User");

// GET PROFILE
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User profile not found" });
        }

        // Return exact shape expected by frontend
        res.status(200).json({
            id: user._id,
            full_name: user.full_name,
            email: user.email,
            age: user.age,
            weight_kg: user.weight_kg,
            height_cm: user.height_cm,
            goal: user.goal,
            activity_level: user.activity_level,
            profile_image: user.profile_image,
            updated_at: user.updatedAt || user.createdAt
        });
    } catch (err) {
        console.error("Get Profile Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// UPDATE PROFILE
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const body = req.body;

        const updateData = {};
        if (body.full_name !== undefined) updateData.full_name = body.full_name;
        if (body.age !== undefined) updateData.age = Number(body.age);
        if (body.height_cm !== undefined) updateData.height_cm = Number(body.height_cm);
        if (body.weight_kg !== undefined) updateData.weight_kg = Number(body.weight_kg);
        if (body.activity_level !== undefined) updateData.activity_level = body.activity_level;
        if (body.goal !== undefined) updateData.goal = body.goal;
        if (body.profile_image !== undefined) updateData.profile_image = body.profile_image;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { returnDocument: "after", runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found to update profile" });
        }

        res.status(200).json({ msg: "Profile updated successfully!" });
    } catch (err) {
        console.error("Update Profile Error:", err);
        res.status(500).json({ error: err.message });
    }
};
