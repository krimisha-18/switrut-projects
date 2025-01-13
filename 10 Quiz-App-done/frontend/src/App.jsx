import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuizList from './pages/QuizList';
import QuizPage from './pages/QuizPage';
import ScorePage from './pages/ScorePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quizzes" element={<QuizList />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/score/:id" element={<ScorePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
