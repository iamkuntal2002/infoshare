const mongoose = require("mongoose");
const dataSchema = mongoose.Schema({
    roomName: {
        type: String,
        required: true,
        unique: true
    },
    roomPass: String,
    code: String
})

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;