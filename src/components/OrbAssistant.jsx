import React from 'react';

const OrbAssistant = ({ onNext }) => {
  return (
    <>
      <style>{`
        @keyframes wave-0 {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.1) rotate(180deg); opacity: 0.6; }
        }
        @keyframes wave-1 {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 0.2; }
          50% { transform: translate(-50%, -50%) scale(1.05) rotate(-180deg); opacity: 0.5; }
        }
        @keyframes wave-2 {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 0.15; }
          50% { transform: translate(-50%, -50%) scale(1.08) rotate(90deg); opacity: 0.4; }
        }
        @keyframes wave-3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 0.1; }
          50% { transform: translate(-50%, -50%) scale(1.12) rotate(-90deg); opacity: 0.3; }
        }
      `}</style>
      <div className="h-[calc(100vh-120px)] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Orb Circle */}
      {/* Advanced AI Assistant Orb */}
      <div className="relative mb-12">
        {/* Pulsing outer glow rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-80 rounded-full animate-pulse" style={{
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)',
            animationDuration: '3s'
          }}></div>
        </div>
        
        {/* Fluid wave rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-80 rounded-full animate-pulse" style={{
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, transparent 70%)',
            animationDuration: '4s'
          }}></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-72 h-72 rounded-full animate-pulse" style={{
            background: 'radial-gradient(circle, rgba(255, 20, 147, 0.08) 0%, transparent 70%)',
            animationDuration: '3s',
            animationDelay: '1s'
          }}></div>
        </div>
        
        {/* Main AI orb */}
        <div className="relative w-64 h-64 rounded-full overflow-hidden" style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, 
            rgba(0, 191, 255, 0.7) 20%, 
            rgba(255, 20, 147, 0.6) 40%, 
            rgba(138, 43, 226, 0.5) 60%, 
            rgba(0, 191, 255, 0.3) 80%, 
            rgba(15, 21, 36, 0.6) 100%)`,
          border: '2px solid rgba(0, 191, 255, 0.6)',
          boxShadow: `
            0 0 120px rgba(0, 191, 255, 0.9),
            0 0 160px rgba(255, 20, 147, 0.7),
            0 0 200px rgba(138, 43, 226, 0.5),
            inset 0 0 80px rgba(255, 255, 255, 0.4),
            inset 0 0 120px rgba(0, 191, 255, 0.5)
          `
        }}>
          {/* Fluid wave patterns */}
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-70">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${60 + i * 20}%`,
                  height: `${60 + i * 20}%`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: `radial-gradient(circle at ${30 + i * 20}% ${30 + i * 20}%, 
                    rgba(0, 191, 255, 0.3) 0%, 
                    rgba(255, 20, 147, 0.2) 30%, 
                    rgba(138, 43, 226, 0.15) 60%, 
                    transparent 100%)`,
                  animation: `wave-${i} ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Fluid energy waves */}
          <div className="absolute inset-8 rounded-full animate-pulse" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.2) 0%, rgba(255, 20, 147, 0.1) 50%, transparent 100%)',
            animationDuration: '2.5s'
          }}></div>
          
          {/* Flowing wave ring */}
          <div className="absolute inset-6 rounded-full animate-pulse" style={{
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(0, 229, 255, 0.3) 25%, rgba(255, 20, 147, 0.2) 50%, rgba(138, 43, 226, 0.1) 75%, transparent 100%)',
            animationDuration: '4s',
            animationDelay: '0.5s'
          }}></div>
          
          {/* Secondary wave ring */}
          <div className="absolute inset-10 rounded-full animate-pulse" style={{
            background: 'conic-gradient(from 180deg, transparent 0%, rgba(138, 43, 226, 0.2) 30%, rgba(0, 255, 127, 0.15) 60%, transparent 100%)',
            animationDuration: '3.5s',
            animationDelay: '1s'
          }}></div>
          
          
          {/* Glowing inner sphere */}
          <div className="absolute inset-12 rounded-full animate-pulse" style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.6) 0%, rgba(0, 255, 255, 0.4) 30%, rgba(150, 0, 255, 0.3) 60%, transparent 100%)',
            animationDuration: '2.5s'
          }}></div>
          
          {/* AI core with scanning effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-12 h-12 rounded-full animate-pulse" style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(0, 229, 255, 0.6) 40%, rgba(138, 43, 226, 0.3) 70%, transparent 100%)',
              boxShadow: '0 0 30px rgba(0, 229, 255, 0.8), 0 0 50px rgba(255, 20, 147, 0.4)',
              animationDuration: '1.5s'
            }}>
              {/* Core scanner line */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" style={{
                  top: '50%',
                  animationDuration: '2s'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Text */}
      <div className="text-center mb-16 mt-8">
        <h1 className="text-6xl font-bold font-bebas tracking-tight text-machine-primary mb-2" style={{
          letterSpacing: '0.05em'
        }}>
          Welcome to THE MACHINE
        </h1>
        
        <p className="text-xl text-machine-tertiary font-inter max-w-2xl mx-auto mt-5">
          Your AI-powered creative companion
        </p>
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
    </>
  );
};

export default OrbAssistant;
