const express = require("express");
const router = express.Router();

const { getUserProfile, updateUserProfile } = require("../controllers/profileController");

router.get("/", getUserProfile);
router.post("/", updateUserProfile);
router.post("/update", updateUserProfile);

module.exports = router;
