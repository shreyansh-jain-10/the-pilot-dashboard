import React from 'react';

const TuneMachine = ({ onNext, onHome }) => {
  return (
    <div className="h-[calc(100vh-120px)] flex flex-col items-center justify-center px-6 overflow-hidden relative">
      {/* Home Button */}
      <button
        onClick={onHome}
        className="absolute top-4 left-4 group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
        style={{
          background: 'rgba(15, 21, 36, 0.8)',
          border: '1px solid rgba(0, 229, 255, 0.3)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <svg className="w-4 h-4 text-acc-cyan group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="text-sm font-medium text-machine-primary font-inter">Home</span>
      </button>
      {/* Main Content */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
      
        <p className="text-6xl text-machine-primary font-bebas mb-3" style={{
          letterSpacing: '0.05em',
          textShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
        }}>
          Tune the machine
        </p>
        
        
        <p className="text-xl text-machine-tertiary font-inter max-w-2xl mx-auto mb-10">
        Upload and manage your brand identity
        </p>

        {/* Placeholder for future upload cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {['Guidelines', 'Logos', 'Palettes', 'Fonts', 'Images', '+ Add More'].map((item, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl border-2 border-dashed transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'rgba(15, 21, 36, 0.3)',
                borderColor: 'rgba(0, 229, 255, 0.2)',
                boxShadow: '0 0 20px rgba(0, 229, 255, 0.1)'
              }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{
                  backgroundColor: 'rgba(0, 229, 255, 0.1)',
                  border: '1px solid rgba(0, 229, 255, 0.3)'
                }}>
                  <svg className="w-8 h-8 text-acc-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-machine-primary font-inter">
                  {item}
                </h3>
                <p className="text-sm text-machine-tertiary mt-2">
                  Coming soon
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrow */}
      <button
        onClick={onNext}
        className="group flex items-center space-x-3 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(255, 20, 147, 0.1) 100%)',
          border: '1px solid rgba(0, 229, 255, 0.3)',
          boxShadow: '0 0 30px rgba(0, 229, 255, 0.2)'
        }}
      >
        <span className="text-lg font-semibold text-machine-primary font-inter">
          Continue
        </span>
        <div className="w-6 h-6 flex items-center justify-center">
          <svg 
            className="w-4 h-4 text-acc-cyan group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default TuneMachine;
