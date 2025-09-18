import React, { useState } from 'react';

const ApprovalButtons = ({ onApprove, onReject, loading, isRevision = false }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleApprove = () => {
    onApprove();
  };

  const handleReject = () => {
    if (showFeedback) {
      if (feedback.trim()) {
        onReject(feedback);
        setFeedback('');
        setShowFeedback(false);
      }
    } else {
      setShowFeedback(true);
    }
  };

  const handleCancelReject = () => {
    setShowFeedback(false);
    setFeedback('');
  };

  return (
    <div className="space-y-4">
      {showFeedback && (
        <div className="card bg-red-50 border-red-200">
          <h3 className="text-lg font-semibold text-red-800 mb-3">
            Request Changes
          </h3>
          <div className="space-y-3">
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-red-700 mb-2">
                What would you like to change?
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Please describe what changes you'd like to see in the script..."
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleReject}
                disabled={loading || !feedback.trim()}
                className={`btn-danger ${loading || !feedback.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Submitting...' : 'Submit Changes'}
              </button>
              <button
                onClick={handleCancelReject}
                disabled={loading}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {!showFeedback && (
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={handleApprove}
            disabled={loading}
            className={`group relative px-10 py-4 text-lg font-semibold text-white rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="loading-spinner mr-3"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{isRevision ? 'Approve Refined Script' : 'Approve Script'}</span>
              </div>
            )}
          </button>
          
          <button
            onClick={handleReject}
            disabled={loading}
            className="group relative px-10 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:border-orange-400 hover:bg-orange-50 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Request Changes</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ApprovalButtons;
