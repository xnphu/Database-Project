const express = require('express');
const GuestRouter = express.Router();
const bcrypt = require('bcrypt-nodejs');

const GuestModel = require('../models/guestModel');

// Get guest by id
GuestRouter.get("/:id", async (req, res) => {
    let guestId = req.params.id;
    try {
        const guestFound = await GuestModel.findById(guestId)
        if (!guestFound) {
            res.status(404).json({ success: 0, message: "Not found!" })
        } else {
            res.json({ success: 1, guestFound })
        }
    } catch (error) {
        res.status(500).json({ success: 0, message: error })
    }
});

// GuestRouter.use((req, res, next) => {
//     const { userInfo } = req.session;
//     if (userInfo && userInfo.role >= 1) {
//         next();
//     } else res.status(404).json({ success: 0, message: "Permission denied" });
// })

// "/api/guests" => get all
GuestRouter.get("/", async (req, res) => {
    try {
        const guests = await GuestModel.find({}, "name email age phone")
        res.json({ success: 1, guests })
    } catch (error) {
        res.status(500).json({ success: 0, error: error })
    }
});

// Create guest
GuestRouter.post("/", async (req, res) => {
    const { name, email, password, age, phone } = req.body;
    try {
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
        const guestCreated = await GuestModel.create({ name, email, hashPassword, age, phone });
        res.status(201).json({ success: 1, guestCreated })
    } catch (error) {
        res.status(500).json({ success: 0, message: error })
    }
});

// Edit guest
GuestRouter.put("/:id", async (req, res) => {
    const guestId = req.params.id;
    const { name, password, age, phone } = req.body;
    try {
        const guestFound = await GuestModel.findById(guestId)
        if (!guestFound) {
            res.status(404).json({ success: 0, message: "Not found!" })
        } else {
            for (key in { name, password, age, phone }) {
                if (guestFound["hashPassword"] && req.body["password"]) {
                    const plainPasswordNew = req.body["password"];
                    const hashPasswordOld = guestFound["hashPassword"];
                    if (!bcrypt.compareSync(plainPasswordNew, hashPasswordOld)) {
                        guestFound["hashPassword"] = bcrypt.hashSync(plainPasswordNew, bcrypt.genSaltSync());
                    }
                } else if (guestFound[key] && req.body[key]) guestFound[key] = req.body[key];
            }
            let guestUpdated = guestFound.save();
            res.json({ success: 1, guest: guestUpdated })
        }
    } catch (error) {
        res.status(500).json({ success: 0, message: error })
    }
});

// Delete guest
GuestRouter.delete("/:id", async (req, res) => {
    const guestId = req.params.id;
    try {
        await GuestModel.remove({ _id: guestId })
        res.json({ success: 1 });
    } catch (error) {
        res.status(500).json({ success: 0, message: error })
    }
});

module.exports = GuestRouter;