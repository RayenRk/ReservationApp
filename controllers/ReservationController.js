const Reservation = require('../models/Reservation');

const createReservation = async (req, res) => {
    try {
        // Logic to create a reservation
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateReservation = async (req, res) => {
    try {
        // Logic to update a reservation
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteReservation = async (req, res) => {
    try {
        // Logic to delete a reservation
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
    createReservation,
    updateReservation,
    deleteReservation,
    isRoomReserved
};
