const { isRoomReserved } = require('../controllers/reservationController');

const isReserved = async (req, res) => {
    try {
        const { roomId, startTime, endTime } = req.body;

        // Check if the room is already reserved for the requested time slot
        const roomReserved = await isRoomReserved(roomId, startTime, endTime);
        if (roomReserved) {
            return res.status(400).json({ message: 'Room already reserved for the requested time slot' });
        }

        // Proceed with creating the reservation
        // Logic to create a reservation
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = isReserved;