const express = require('express');
const router = express.Router();
const { getAllReservations, getReservationById, createReservation, updateReservation, deleteReservation, isRoomReserved } = require('../controllers/reservationController');
const authenticate = require('../middlewares/authenticate');

router.post('/create', authenticate, isRoomReserved, createReservation);
router.put('/update/:id', authenticate, updateReservation);
router.delete('/delete/:id', authenticate, deleteReservation);
router.get('/all', authenticate, getAllReservations);
router.get('/:id', authenticate, getReservationById);

module.exports = router;