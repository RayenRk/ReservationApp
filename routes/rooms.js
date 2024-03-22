const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const { isRoomReserved } = require('../controllers/reservationController');
const { createMeetingRoom, getAllMeetingRooms, getMeetingRoomById, updateMeetingRoomById, deleteMeetingRoomById } = require('../controllers/MeetingRoomController');

// Create a new meeting room
router.post('/add', authenticate, createMeetingRoom);
router.get('/all', authenticate, getAllMeetingRooms);
router.get('/:id', authenticate, getMeetingRoomById);
router.put('/update/:id', authenticate, isRoomReserved, updateMeetingRoomById);
router.delete('/delete/:id', authenticate, isRoomReserved, deleteMeetingRoomById);

module.exports = router;