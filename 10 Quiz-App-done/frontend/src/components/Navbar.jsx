import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-slate-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold">
              Quizz Master
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/quizzes" className="text-white hover:text-gray-200">
              Quizzes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 