const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuestSchema = new Schema({
    name: ({ type: String, required: true }),
    email: ({ type: String, required: true }),
    hashPassword: ({ type: String, required: true }),
    age: ({ type: Number, required: true }),
    phone: ({ type: Number })
});

GuestSchema.pre("save", function (next) {
    console.log(this);
    next();
});

module.exports = mongoose.model("Guest", GuestSchema);
