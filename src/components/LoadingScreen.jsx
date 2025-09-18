import React from 'react';

const LoadingScreen = ({ message = "Generating your script..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center max-w-2xl mx-auto px-6">
        <div className="mb-12">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl">
              <div className="loading-spinner w-12 h-12 border-4"></div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          
          <div className="flex justify-center space-x-2 mb-8">
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-900 mb-4">The Pilot is Working</h2>
        <p className="text-xl text-gray-600 mb-8">{message}</p>
        
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-xl border-0">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium">Analyzing your campaign requirements</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium">Generating creative script concepts</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium">Structuring scenes and dialogue</span>
              </div>
              
              <div className="flex items-center space-x-3 text-primary-600">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                  <div className="loading-spinner w-4 h-4"></div>
                </div>
                <span className="font-medium">Finalizing character descriptions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
