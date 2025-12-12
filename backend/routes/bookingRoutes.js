const express = require("express");
const router = express.Router();

const { createBooking, getUserBookings } = require("../controllers/bookingController");

router.post("/create", createBooking);
router.get("/:user_id", getUserBookings);

module.exports = router;
