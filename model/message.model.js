//message model

//importing mongoose
const mongoose = require("mongoose");
// const

//schema
const MessageSchema = new mongoose.Schema({
    when: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
        required: true 
    },
    room: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("Message", MessageSchema)
