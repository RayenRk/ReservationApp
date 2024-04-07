const express = require('express');
const MeetingRoom = require('../models/roomsModel');
const Reservation = require('../models/reservationModel');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: '🧑‍🏫 Reservation App' });
});

router.get("/rooms", async (req, res) => {
  try {
    const rooms = await MeetingRoom.find();
    res.render("rooms", { rooms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('room').populate('user');
    res.render("reservations", { reservations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
