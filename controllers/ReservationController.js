const Reservation = require('../models/reservationModel');
const mongoose = require('mongoose');
const mailer = require('../mailer/nodemailer');
const User = require("../models/userModel");



const createReservation = async (req, res) => {
    try {
        console.log("Start Time "+req.body.startTime + "End Time "+ req.body.endTime + "RoomID "+req.body.meetingroom + "User" +req.body.user);
        const userEmail = await User.findById(req.body.user).populate('user')
        console.log(userEmail)
        const alert = await isRoomReserved(req.body.meetingroom, req.body.startTime, req.body.endTime);


        if(alert===true){
            await Send("slbrankomouheb@gmail.com");
        }else {
            await Send("slbrankomouheb@gmail.com");
        }
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 };



// const createReservation = async (req, res) => {
//     try {
//         req.body.email = "ghabrimouheb@gmail.com"
//         console.log("Start Time: " + req.body.startTime + ", End Time: " + req.body.endTime + ", RoomID: " + req.body.meetingroom + ", Email: " + req.body.email);
//         console.log("maaaaaaaail"+req.body.email);
//
//         const alert = await isRoomReserved(req.body.meetingroom, req.body.startTime, req.body.endTime);
//         console.log("Alert: " + alert);
//
//         if (alert) {
//             await Send(req.body.email);
//             console.log("maaaaaaaail"+req.body.email);
//         } else {
//             console.log("maaaaaaaail"+req.body.email);
//             console.log("Room is available. Proceeding with reservation.");
//             await Send(req.body.email);
//         }
//
//         const reservation = await Reservation.create(req.body);
//         res.status(201).json(reservation);
//     } catch (error) {
//         console.error("Error creating reservation:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

const getUserDataById = async (req, res) => {
    try {
        // Assuming you're passing the user ID in the request parameters
        const userId = req.params.userId;

        // Find the user by ID and populate the relevant fields
        const userData = await User.findById(userId).populate('user');

        // Check if user data is found
        if (!userData) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log(userData);
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('meetingroom').populate('user');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getReservationById = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const reservation = await Reservation.findById(reservationId).populate('meetingroom').populate('user');
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

var isRoomReserved = async (roomId, startTime, endTime) => {
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
    const Send = async (req,res,to) => {
        await mailer.nodeMailer(to);
    }

module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
    isRoomReserved,
    Send
};