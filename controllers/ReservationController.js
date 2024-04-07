const Reservation = require('../models/reservationModel');
const mongoose = require('mongoose');
const mailer = require('../mailer/nodemailer');
const User = require("../models/userModel");
const Room = require("../models/meetingRoomModel");

const badRes = "<h1>Hello</h1>"+
    "<h2>we're sorry to inform you that the  desired room is reserved</h2>"+
    "<p>Thank you</p>";
const goodRes = "<h1>Hello</h1>"+
    "<h2>we are happy  to inform you that the  desired room is successfully reserved</h2>"+
    "<p>Thank you for chosing us</p>";

const createReservation = async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomID);
        if(!room){
            console.log("There's no room")
        }else{
            const reservation = await new Reservation({
                meetingRoom : req.params.roomID,
                user : req.user.id,
                startTime: req.body.startTime,
                endTime: req.body.endTime
            });
            reservation.save();
            const alert = await isRoomReserved(req.params.roomID,req.body.startTime,req.body.endTime);
            if(!alert){
                await Send(req.user.email,goodRes);

            }else{
                await Send(req.user.email,badRes);
            }
            res.status(201).json(reservation);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 };

const getUserById = async (req, res,) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


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
const isRoomReserved = async (roomId, startTimeP, endTimeP) => {
    try {
        // Check if any reservations overlap with the requested time slot
        const overlappingReservations = await Reservation.find({
            meetingRoom: roomId,
            $and: [
                { startTime: { $lt: endTimeP } },
                { endTime: { $gt: startTimeP } }
            ]
        });

        return overlappingReservations.length > 0;
    } catch (error) {
        throw new Error('Error checking room availability');
    }
};

const Send = async (to,html) => { await mailer.nodeMailer(to,html); }

module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
    isRoomReserved,
    Send,

};