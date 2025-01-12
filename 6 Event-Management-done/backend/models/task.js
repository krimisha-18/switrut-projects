const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date, 
      required: true, 
    },
    location: {
      type: String, 
      required: true, 
    },
    complete: {
      type: Boolean,
      default: false,
    },
    maxAttendees: {
      type: Number,
      default: 0, 
      min: 0, 
    },
    imgUrl: {
      type: String, 
      required: false, 
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Task", TaskSchema);
