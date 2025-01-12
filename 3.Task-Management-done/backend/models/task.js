const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      //unique: true,
    },
    desc: {
      type: String,
      required: true,
      unique: true,
    },
    important: { // Corrected typo
      type: Boolean,
      default: false,
    },
    complete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Corrected option
);

module.exports = mongoose.model("Task", TaskSchema); // Correct capitalization
