import React from 'react';

const LoadingScreen = ({ message = "Generating your script..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <div className="text-center max-w-2xl mx-auto px-6">
        <div className="mb-12">
          <div className="relative">
            <div className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, var(--acc-iris), var(--acc-cyan))',
              boxShadow: '0 0 30px rgba(126,107,255,0.4), 0 0 60px rgba(0,229,255,0.2)'
            }}>
              <div className="loading-spinner w-12 h-12 border-4" style={{ borderTopColor: '#0A0D13' }}></div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full animate-pulse" style={{ backgroundColor: 'var(--success)' }}></div>
          </div>
          
          <div className="flex justify-center space-x-2 mb-8">
            <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: 'var(--acc-iris)' }}></div>
            <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: 'var(--acc-iris)', animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: 'var(--acc-iris)', animationDelay: '0.2s' }}></div>
          </div>
        </div>
        
        <h2 className="text-4xl font-bold font-spaceg mb-4 text-machine-primary">The Pilot is Working</h2>
        <p className="text-xl font-inter mb-8 text-machine-secondary">{message}</p>
        
        <div className="max-w-lg mx-auto">
          <div className="machine-card p-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 font-inter text-machine-secondary">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(63,228,128,0.12)', border: '1px solid var(--success)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--success)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium">Analyzing your campaign requirements</span>
              </div>
              
              <div className="flex items-center space-x-3 font-inter text-machine-secondary">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(63,228,128,0.12)', border: '1px solid var(--success)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--success)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium">Generating creative script concepts</span>
              </div>
              
              <div className="flex items-center space-x-3 font-inter text-machine-secondary">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(63,228,128,0.12)', border: '1px solid var(--success)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--success)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium">Structuring scenes and dialogue</span>
              </div>
              
              <div className="flex items-center space-x-3 font-inter text-machine-primary">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(126,107,255,0.12)', border: '1px solid var(--acc-iris)' }}>
                  <div className="loading-spinner w-4 h-4" style={{ borderTopColor: 'var(--acc-iris)' }}></div>
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