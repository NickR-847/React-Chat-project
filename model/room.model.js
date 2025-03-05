//room model

//importing mongoose
const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    addedUsers: {
        type: Array,
        required: true
    }
})
module.exports = mongoose.model("Room", RoomSchema)