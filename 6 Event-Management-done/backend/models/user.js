const mongoose = require("mongoose");
const Task = require("./task");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tasks: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Task",
        },
    ], // Changed to an array to hold multiple task references
});

module.exports = mongoose.model("user", userSchema);
