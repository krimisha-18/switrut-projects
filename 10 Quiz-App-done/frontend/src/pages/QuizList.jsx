import { useState, useEffect } from 'react';
import { getQuizzes } from '../services/api';
import QuizCard from '../components/QuizCard';
import Loading from '../components/Loading';
import Error from '../components/Error';

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await getQuizzes();
        console.log('API Response:', response.data);
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setError('Failed to load quizzes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Available Quizzes</h1>
      {quizzes.length === 0 ? (
        <div className="text-center text-gray-600 py-8">
          <p className="text-xl">No quizzes available at the moment.</p>
          <p className="mt-2">Please check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} />
          ))}
        </div>
      )}
    </div>
  );
}

export default QuizList; 