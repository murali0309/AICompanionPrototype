import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';

const Assessment = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  const API_URL = 'http://localhost:3000/api';

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/assessment/questions`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setQuestions(response.data.questions);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to load assessment questions');
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async (questionId, selectedOption, timeSpent) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/assessment/submit`, {
        questionId,
        selectedOption,
        timeSpent
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        // Store the user's answer and submission result
        setUserAnswers(prev => ({
          ...prev,
          [questionId]: selectedOption
        }));

        setSubmittedAnswers(prev => ({
          ...prev,
          [questionId]: {
            userAnswer: selectedOption,
            correctAnswer: response.data.correctAnswer,
            explanation: response.data.explanation,
            isCorrect: response.data.isCorrect
          }
        }));

        // Move to next question or complete assessment
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          setAssessmentComplete(true);
        }
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      setError('Failed to submit answer. Please try again.');
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const resetAssessment = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setSubmittedAnswers({});
    setAssessmentComplete(false);
    setError('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading assessment questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <button
              onClick={fetchQuestions}
              className="mt-3 bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm hover:bg-red-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Questions Available</h3>
        <p className="text-gray-600">There are no assessment questions available at the moment.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentSubmission = submittedAnswers[currentQuestion._id];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Assessment Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Assessment</h2>
          <div className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question Navigation */}
        <div className="flex flex-wrap gap-2 mt-4">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToQuestion(index)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                index === currentQuestionIndex
                  ? 'bg-primary-600 text-white'
                  : submittedAnswers[questions[index]._id]
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Current Question */}
      <Question
        question={currentQuestion}
        onAnswerSubmit={handleAnswerSubmit}
        isSubmitted={!!currentSubmission}
        userAnswer={currentSubmission?.userAnswer}
        correctAnswer={currentSubmission?.correctAnswer}
        explanation={currentSubmission?.explanation}
      />

      {/* Assessment Complete Message */}
      {assessmentComplete && (
        <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
          <div className="text-green-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-green-800 mb-2">Assessment Complete!</h3>
          <p className="text-green-700 mb-4">
            You have completed all questions. Review your answers or start over.
          </p>
          <button
            onClick={resetAssessment}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default Assessment;
