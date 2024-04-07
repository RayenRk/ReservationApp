const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const { isRoomReserved } = require('../controllers/reservationController');
const { createMeetingRoom, getAllMeetingRooms, getMeetingRoomById, updateMeetingRoomById, deleteMeetingRoomById } = require('../controllers/roomsController');

// Create a new meeting room
router.post('/add', authenticate, createMeetingRoom);
router.get('/all', authenticate, getAllMeetingRooms);
router.get('/single/:id', authenticate, getMeetingRoomById);
router.patch('/update/:id', authenticate,  updateMeetingRoomById);
router.delete('/delete/:id', authenticate,  deleteMeetingRoomById);

module.exports = router;