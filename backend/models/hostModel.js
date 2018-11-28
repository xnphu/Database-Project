const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HostSchema = new Schema({
    name: ({ type: String, required: true }),
    email: ({ type: String, required: true }),
    hashPassword: ({ type: String, required: true }),
    age: ({ type: Number, required: true }),
    phone: ({ type: Number }),
    intro: ({ type: String })
});

HostSchema.pre("save", function (next) {
    console.log(this);
    next();
});

module.exports = mongoose.model("Host", HostSchema);
