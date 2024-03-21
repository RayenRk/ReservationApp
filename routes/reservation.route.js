const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authenticate = require('../middlewares/authenticate');
const isReserved = require('../services/reserveCheck');


router.post('/create', authenticate, isReserved, reservationController.createReservation);
router.put('/update', authenticate, reservationController.updateReservation);
router.delete('/delete', authenticate, reservationController.deleteReservation);

module.exports = router;