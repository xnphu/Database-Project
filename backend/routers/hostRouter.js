const express = require('express');
const HostRouter = express.Router();
const bcrypt = require('bcrypt-nodejs');

const HostModel = require('../models/hostModel');

// Get host by id
HostRouter.get("/:id", async (req, res) => {
    let hostId = req.params.id;
    try {
        const hostFound = await HostModel.findById(hostId)
        if (!hostFound) {
            res.status(404).json({ success: 0, message: "Not found!" })
        } else {
            res.json({ success: 1, hostFound })
        }
    } catch (error) {
        res.status(500).json({ success: 0, message: error })
    }
});

// "/api/hosts" => get all
HostRouter.get("/", async (req, res) => {
    try {
        const hosts = await HostModel.find({}, "name email age phone intro ")
        res.json({ success: 1, hosts })
    } catch (error) {
        res.status(500).json({ success: 0, error: error })
    }
});

// Create host
HostRouter.post("/", async (req, res) => {
    const { name, email, password, age, phone, intro } = req.body;
    try {
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
        const hostCreated = await HostModel.create({ name, email, hashPassword, age, phone, intro });
        res.status(201).json({ success: 1, hostCreated })
    } catch (error) {
        res.status(500).json({ success: 0, message: error })
    }
});

// Edit host
HostRouter.put("/:id", async (req, res) => {
    const hostId = req.params.id;
    const { name, password, age, phone, intro } = req.body;
    try {
        const hostFound = await HostModel.findById(hostId)
        if (!hostFound) {
            res.status(404).json({ success: 0, message: "Not found!" })
        } else {
            for (key in { name, password, age, phone, intro }) {
                if (hostFound["hashPassword"] && req.body["password"]) {
                    const plainPasswordNew = req.body["password"];
                    const hashPasswordOld = hostFound["hashPassword"];
                    if (!bcrypt.compareSync(plainPasswordNew, hashPasswordOld)) {
                        hostFound["hashPassword"] = bcrypt.hashSync(plainPasswordNew, bcrypt.genSaltSync());
                    }
                } else if (hostFound[key] && req.body[key]) hostFound[key] = req.body[key];
            }
            let hostUpdated = hostFound.save();
            res.json({ success: 1, host: hostUpdated })
        }
    } catch (error) {
        res.status(500).json({ success: 0, message: error })
    }
});

// Delete host
HostRouter.delete("/:id", async (req, res) => {
    const hostId = req.params.id;
    try {
        await HostModel.remove({ _id: hostId })
        res.json({ success: 1 });
    } catch (error) {
        res.status(500).json({ success: 0, message: error })
    }
});

module.exports = HostRouter;