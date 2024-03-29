const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    meetingroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MeetingRoom',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startTime: {
        type: Date,
        //required: true
    },
    endTime: {
        type: Date,
        //required: true
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;