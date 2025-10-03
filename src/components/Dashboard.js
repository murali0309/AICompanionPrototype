import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Assessment } from '../assessment';

const Dashboard = () => {
  const { user } = useAuth();
  const [showAssessment, setShowAssessment] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold text-2xl">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Welcome back, {user?.name}! 👋
                  </h1>
                  <p className="mt-1 text-lg text-gray-500">
                    You're logged in to your AI Companion dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Assessment Section */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Assessment
                </h3>
                <button
                  onClick={() => setShowAssessment(!showAssessment)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  {showAssessment ? 'Hide Assessment' : 'Start Assessment'}
                </button>
              </div>
              
              {!showAssessment ? (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.0 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">
                        Ready to test your knowledge?
                      </h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          Click the "Start Assessment" button to begin answering questions. 
                          Your progress and answers will be saved automatically.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Assessment />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
