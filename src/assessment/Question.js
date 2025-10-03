import React, { useState } from 'react';

const Question = ({ question, onAnswerSubmit, isSubmitted, userAnswer, correctAnswer, explanation }) => {
  const [selectedOption, setSelectedOption] = useState(userAnswer || '');
  const [timeSpent, setTimeSpent] = useState(0);

  // Start timer when component mounts
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOptionSelect = (optionText) => {
    if (!isSubmitted) {
      setSelectedOption(optionText);
    }
  };

  const handleSubmit = () => {
    if (selectedOption && !isSubmitted) {
      onAnswerSubmit(question._id, selectedOption, timeSpent);
    }
  };

  const getOptionStyle = (optionText) => {
    if (!isSubmitted) {
      return selectedOption === optionText
        ? 'bg-primary-100 border-primary-500 text-primary-700'
        : 'bg-white border-gray-300 hover:bg-gray-50';
    }

    // After submission, show correct/incorrect styling
    if (optionText === correctAnswer) {
      return 'bg-green-100 border-green-500 text-green-700';
    } else if (optionText === userAnswer && optionText !== correctAnswer) {
      return 'bg-red-100 border-red-500 text-red-700';
    }
    
    return 'bg-gray-100 border-gray-300 text-gray-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Question {question.category && `(${question.category})`}
        </h3>
        <p className="text-gray-700">{question.questionText}</p>
        {question.difficulty && (
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${
            question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {question.difficulty}
          </span>
        )}
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
              getOptionStyle(option.text)
            }`}
          >
            <input
              type="radio"
              name={`question-${question._id}`}
              value={option.text}
              checked={selectedOption === option.text}
              onChange={() => handleOptionSelect(option.text)}
              disabled={isSubmitted}
              className="sr-only"
            />
            <div className="flex items-center w-full">
              <div className={`w-4 h-4 border-2 rounded-full mr-3 flex-shrink-0 ${
                selectedOption === option.text
                  ? 'border-current bg-current'
                  : 'border-gray-400'
              }`}>
                {selectedOption === option.text && (
                  <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                )}
              </div>
              <span className="text-sm font-medium">{option.text}</span>
            </div>
          </label>
        ))}
      </div>

      {!isSubmitted && (
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Submit Answer
        </button>
      )}

      {isSubmitted && (
        <div className="mt-4 p-4 rounded-md">
          {userAnswer === correctAnswer ? (
            <div className="bg-green-50 border border-green-200 text-green-800">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Correct!</span>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 text-red-800">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Incorrect</span>
              </div>
              <p className="mt-1 text-sm">Correct answer: {correctAnswer}</p>
            </div>
          )}
          
          {explanation && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Explanation:</h4>
              <p className="text-sm text-blue-700">{explanation}</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500 text-center">
        Time spent: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default Question;
