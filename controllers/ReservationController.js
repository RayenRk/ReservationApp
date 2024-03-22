const Reservation = require('../models/reservationModel');
const mongoose = require('mongoose');

const createReservation = async (req, res) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('room').populate('user');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getReservationById = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const reservation = await Reservation.findById(reservationId).populate('room').populate('user');
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const updatedReservation = req.body;
        const reservation = await Reservation.findByIdAndUpdate(reservationId, updatedReservation, { new: true });
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const reservation = await Reservation.findByIdAndDelete(reservationId);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const isRoomReserved = async (roomId, startTime, endTime) => {
    try {
        // Check if any reservations overlap with the requested time slot
        const overlappingReservations = await Reservation.find({
            room: roomId,
            $or: [
                { $and: [{ startTime: { $lte: startTime } }, { endTime: { $gte: startTime } }] },
                { $and: [{ startTime: { $lte: endTime } }, { endTime: { $gte: endTime } }] },
                { $and: [{ startTime: { $gte: startTime } }, { endTime: { $lte: endTime } }] }
            ]
        });

        return overlappingReservations.length > 0;
    } catch (error) {
        throw new Error('Error checking room availability');
    }
};

module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
    isRoomReserved
};
