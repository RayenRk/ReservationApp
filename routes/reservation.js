const express = require('express');
const router = express.Router();
const { getAllReservations, getReservationById, createReservation, updateReservation, deleteReservation, } = require('../controllers/reservationController');
//,Notification
const authenticate = require('../middlewares/authenticate');

router.post('/create', authenticate, createReservation);
router.patch('/update/:id', authenticate, updateReservation);
router.delete('/delete/:id', authenticate, deleteReservation);
router.get('/all', authenticate, getAllReservations);
router.get('/single/:id', authenticate, getReservationById);
//router.post('/notify',authenticate,userNotify);//authenticate,isRoomReserved,userNotify


module.exports = router;