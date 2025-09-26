import React from 'react';

const ErrorModal = ({ 
  isOpen,
  error, 
  onClose,
  title = "Refinement Failed"
}) => {
  if (!isOpen || !error) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="machine-card p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{
            backgroundColor: 'rgba(255, 94, 102, 0.1)',
            border: '2px solid rgba(255, 94, 102, 0.3)'
          }}>
            <svg className="w-8 h-8" style={{ color: 'var(--danger)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-semibold text-machine-primary mb-2">
            {title}
          </h3>
          
          <div className="text-sm text-machine-secondary mb-4">
            <p className="mb-2">We encountered an issue while processing your request:</p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-left">
              <p className="text-red-800 font-medium break-words">
                {error}
              </p>
            </div>
          </div>
          
          <p className="text-sm text-machine-tertiary">
            Please try again. The issue may be temporary.
          </p>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleClose}
            className="px-8 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'var(--acc-iris)',
              color: '#0A0D13',
              border: 'none'
            }}
          >
            Okay, Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;