import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById, submitQuiz } from '../services/api';
import QuizQuestion from '../components/QuizQuestion';

function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuizById(id);
        setQuiz(response.data);
        setAnswers(new Array(response.data.questions.length).fill(null));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await submitQuiz({
        quizId: id,
        answers: answers
      });
      
      if (response.data) {
        navigate(`/score/${id}`, { 
          state: {
            score: response.data.score,
            totalQuestions: response.data.totalQuestions,
            correctAnswers: response.data.correctAnswers,
            questionResults: response.data.questionResults
          }
        });
      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
        <div className="bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <QuizQuestion
        question={quiz.questions[currentQuestion]}
        selectedAnswer={answers[currentQuestion]}
        onAnswerSelect={handleAnswerSelect}
      />

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setCurrentQuestion(prev => prev - 1)}
          disabled={currentQuestion === 0}
          className="px-6 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        {currentQuestion === quiz.questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={answers.includes(null)}
            className="px-6 py-2 rounded-lg bg-primary text-white disabled:opacity-50"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={answers[currentQuestion] === null}
            className="px-6 py-2 rounded-lg bg-primary text-white disabled:opacity-50"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizPage; 