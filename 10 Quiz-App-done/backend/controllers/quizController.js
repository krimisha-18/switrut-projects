const Quiz = require('../models/Quiz');

exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({}).select('title description thumbnail questions');
    console.log('Fetched quizzes:', quizzes);
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate score
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        correctAnswers++;
      }
    });

    const totalQuestions = quiz.questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Return detailed results
    const results = {
      score,
      totalQuestions,
      correctAnswers,
      questionResults: quiz.questions.map((question, index) => ({
        question: question.text,
        userAnswer: question.options[answers[index]],
        correctAnswer: question.options[question.correctAnswer],
        isCorrect: question.correctAnswer === answers[index]
      }))
    };

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 