const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    title: ({ type: String, required: true }),
    description: ({ type: String, default: "" }),
    address: ({ type: String, required: true }),
    bookingfee: ({ type: Number, default: 0}),
    host: ({ type: Schema.Types.ObjectId, ref: "Host" }),
    numberOfGuests: ({ type: Number, default: 0 }),
    guest: [{ type: Schema.Types.ObjectId, ref: "Guest" }],
    bedroom: ({ type: Number }),
    bed: ({ type: Number }),
    bath: ({ type: Number })
});

module.exports = mongoose.model("Room", RoomSchema);