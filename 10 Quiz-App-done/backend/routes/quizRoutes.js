const express = require('express');
const router = express.Router();
const {
  getQuizzes,
  getQuizById,
  submitQuiz
} = require('../controllers/quizController');

router.get('/', getQuizzes);
router.get('/:id', getQuizById);
router.post('/submit', submitQuiz);

module.exports = router; 