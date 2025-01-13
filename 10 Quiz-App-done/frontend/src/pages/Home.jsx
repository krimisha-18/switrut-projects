import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
      <div className="text-center text-white p-8">
        <h1 className="text-5xl font-bold mb-6">Welcome to QuizMaster</h1>
        <p className="text-xl mb-8">Test your knowledge with our interactive quizzes!</p>
        <Link 
          to="/quizzes" 
          className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
}

export default Home; 