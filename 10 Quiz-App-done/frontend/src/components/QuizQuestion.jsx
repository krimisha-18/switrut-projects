import React from 'react';

function QuizQuestion({ question, selectedAnswer, onAnswerSelect }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full p-4 text-left rounded-lg border transition-all ${
              selectedAnswer === index
                ? 'bg-primary text-white border-primary'
                : 'border-gray-200 hover:border-primary hover:bg-gray-50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizQuestion; 