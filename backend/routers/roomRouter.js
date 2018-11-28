const express = require('express');
const RoomRouter = express.Router();

const RoomModel = require('../models/roomModel');

// "/api/rooms" => get all
RoomRouter.get("/", async (req, res) => {
    try {
        const rooms = await RoomModel.find({})
            .populate("guest", "name")
            .populate("host", "name")
        res.json({ success: 1, rooms })
    } catch (error) {
        res.status(500).json({ success: 0, error: error })
    }
})

// Get room by id
RoomRouter.get("/:id", async (req, res) => {
    let roomId = req.params.id;
    try {
        const roomFound = await RoomModel.findById(roomId)
        if (!roomFound) {
            res.status(404).json({ success: 0, message: "Not found!" })
        } else {
            res.json({ success: 1, roomFound })
        }
    } catch (error) {
        res.status(500).json({ success: 0, message: err })
    }
});

// Create room
RoomRouter.post("/", async (req, res) => {
    const { title, description, address, bookingfee, host, numberOfGuests, guest, bedroom, bed, bath } = req.body;
    try {
        const roomUpdated = await RoomModel.create({ title, description, address, bookingfee, host, numberOfGuests, guest, bedroom, bed, bath })
        res.status(201).json({ success: 1, roomUpdated })
    } catch (error) {
        res.status(500).json({ success: 0, message: error })
    }
});

// Edit room
RoomRouter.put("/:id", async (req, res) => {
    const roomId = req.params.id;
    const { title, description, address, bookingfee, numberOfGuests, guest, bedroom, bed, bath } = req.body;
    try {
        const roomFound = await RoomModel.findById(roomId)
        if (!roomFound) {
            res.status(404).json({ success: 0, message: "Not found!" })
        } else {
            for (key in { title, description, address, bookingfee, numberOfGuests, guest, bedroom, bed, bath }) {
                if (roomFound[key] && req.body[key]) roomFound[key] = req.body[key];
            }
            let roomUpdated = roomFound.save()
            res.json({ success: 1, user: roomUpdated })
        }
    } catch (error) {
        res.status(500).json({ success: 0, message: error })
    }
});

// Delete room
RoomRouter.delete("/:id", async (req, res) => {
    const roomId = req.params.id;
    try {
        await RoomModel.remove({ _id: roomId })
        res.json({ success: 1 });
    } catch (error) {
        res.status(500).json({ success: 0, message: err})
    }
});

module.exports = RoomRouter;