const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        //required: true
    },
    endTime: {
        type: Date,
        //required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        //required: true
    },
    meetingRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MeetingRoom',
        //required: true,
        select: true
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;