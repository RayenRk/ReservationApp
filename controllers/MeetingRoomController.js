const MeetingRoom = require('../models/meetingRoomModel');

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await MeetingRoom.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRoomDetails = async (req, res) => {
    try {
        const roomId = req.params.id;
        const room = await MeetingRoom.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};