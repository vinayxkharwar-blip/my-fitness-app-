const express = require("express");
const router = express.Router();

const { addWaterLog, getWaterLogs } = require("../controllers/waterController");

router.post("/add", addWaterLog);
router.get("/:user_id", getWaterLogs);

module.exports = router;
