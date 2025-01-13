import { useLocation, Link, Navigate } from 'react-router-dom';

function ScorePage() {
  const location = useLocation();
  const results = location.state;

  // If no results data, redirect to quizzes page
  if (!results) {
    return <Navigate to="/quizzes" replace />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
          <div className="text-6xl font-bold text-primary mb-2">
            {results.score}%
          </div>
          <p className="text-gray-600">
            You got {results.correctAnswers} out of {results.totalQuestions} questions correct
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Detailed Results:</h2>
          {results.questionResults && results.questionResults.map((result, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg ${
                result.isCorrect ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <p className="font-medium mb-2">
                Question {index + 1}: {result.question}
              </p>
              <div className="space-y-1 text-sm">
                <p>
                  Your answer: 
                  <span className={result.isCorrect ? 'text-green-600' : 'text-red-600'}>
                    {' '}{result.userAnswer || 'No answer'}
                  </span>
                </p>
                {!result.isCorrect && (
                  <p className="text-green-600">
                    Correct answer: {result.correctAnswer}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/quizzes"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            Try Another Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ScorePage; 