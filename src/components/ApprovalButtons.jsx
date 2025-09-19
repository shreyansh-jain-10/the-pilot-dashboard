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
        <div className="machine-card" style={{ 
          backgroundColor: 'rgba(255,94,102,0.1)',
          border: '1px solid var(--danger)'
        }}>
          <h3 className="text-lg font-semibold mb-3 font-spaceg" style={{ color: 'var(--danger)' }}>
            Request Changes
          </h3>
          <div className="space-y-3">
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium mb-2 font-inter" style={{ color: 'var(--danger)' }}>
                What would you like to change?
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-inter machine-input"
                style={{
                  backgroundColor: '#0F1524',
                  borderColor: 'var(--danger)',
                  color: 'var(--text-primary)'
                }}
                placeholder="Please describe what changes you'd like to see in the script..."
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleReject}
                disabled={loading || !feedback.trim()}
                className={`px-6 py-3 text-base font-medium rounded-xl shadow-md transition-all duration-200 font-spaceg ${
                  loading || !feedback.trim()
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:scale-105 focus:ring-2 focus:ring-red-300'
                }`}
                style={loading || !feedback.trim() ? {
                  backgroundColor: '#2A3450',
                  color: '#8390AD'
                } : {
                  background: 'linear-gradient(90deg, var(--danger), #ff4757)',
                  color: 'white'
                }}
              >
                {loading ? 'Submitting...' : 'Submit Changes'}
              </button>
              <button
                onClick={handleCancelReject}
                disabled={loading}
                className="px-6 py-3 text-base font-medium rounded-xl shadow-md transition-all duration-200 font-spaceg hover:scale-105 focus:ring-2 focus:ring-gray-300"
                style={{
                  backgroundColor: 'var(--bg-1)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)'
                }}
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
            className={`group relative px-10 py-4 text-lg font-semibold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 font-spaceg ${
              loading 
                ? 'cursor-not-allowed' 
                : 'machine-cta hover:machine-cta-hover'
            }`}
            style={loading ? {
              backgroundColor: '#2A3450',
              color: '#8390AD',
              boxShadow: 'none'
            } : {}}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="loading-spinner mr-3" style={{ borderTopColor: '#8390AD' }}></div>
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
            className="group relative px-10 py-4 text-lg font-semibold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 font-spaceg"
            style={{
              backgroundColor: 'var(--bg-1)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)'
            }}
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
