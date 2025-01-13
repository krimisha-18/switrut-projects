const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  questions: [{
    text: {
      type: String,
      required: true,
    },
    options: [{
      type: String,
      required: true,
    }],
    correctAnswer: {
      type: Number,
      required: true,
    },
  }],
}, {
  timestamps: true
});

// Delete existing model if it exists
mongoose.models = {};

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz; 