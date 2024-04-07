const MeetingRoom = require('../models/meetingRoomModel');
const schemaRoom = require('../middlewares/validate');

// Create a new meeting room
const createMeetingRoom = async (req, res) => {
    try {
        const { error } = schemaRoom.schemaRoom.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        // check if the room already exists in the database by name
        const roomExists = await MeetingRoom.findOne({ name: req.body.name });
        if (roomExists) {
            return res.status(409).json({ message: 'Room already exists' });
        }
        const { name, capacity,equipments,  availability } = req.body; //
        const newMeetingRoom = await MeetingRoom.create({ name, capacity, equipments, availability }); // 
        res.status(201).json(newMeetingRoom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all meeting rooms
const getAllMeetingRooms = async (req, res) => {
    try {
        const meetingRooms = await MeetingRoom.find();
        res.status(200).json(meetingRooms);
        //res.render("rooms", { rooms: meetingRooms });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get meeting room by ID
const getMeetingRoomById = async (req, res) => {
    try {
        const roomId = req.params.id;
        const meetingRoom = await MeetingRoom.findById(roomId);
        if (!meetingRoom) {
            return res.status(404).json({ message: 'Meeting room not found' });
        }
        res.status(200).json(meetingRoom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update meeting room by ID
const updateMeetingRoomById = async (req, res) => {
    try {
        const roomId = req.params.id;
        const { name, capacity, equipments, availability } = req.body;
        const updatedMeetingRoom = await MeetingRoom.findByIdAndUpdate(roomId, { name, capacity, equipments, availability }, { new: true });
        if (!updatedMeetingRoom) {
            return res.status(404).json({ message: 'Meeting room not found' });
        }
        res.status(200).json(updatedMeetingRoom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete meeting room by ID
const deleteMeetingRoomById = async (req, res) => {
    try {
        const roomId = req.params.id;
        const deletedMeetingRoom = await MeetingRoom.findByIdAndDelete(roomId);
        if (!deletedMeetingRoom) {
            return res.status(404).json({ message: 'Meeting room not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    createMeetingRoom,
    getAllMeetingRooms,
    getMeetingRoomById,
    updateMeetingRoomById,
    deleteMeetingRoomById
};