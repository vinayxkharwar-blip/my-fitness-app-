const express = require("express");
const router = express.Router();

const { getAllTrainers, getTrainerDetails } =
    require("../controllers/trainerController");

router.get("/", getAllTrainers);            // GET ALL TRAINERS
router.get("/:trainer_id", getTrainerDetails); // GET TRAINER DETAILS

module.exports = router;
