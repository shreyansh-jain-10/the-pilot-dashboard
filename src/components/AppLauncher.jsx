import React from 'react';

const AppLauncher = ({ onLaunchVideoCampaign, onHome }) => {
  const modules = [
    {
      id: 'video-campaign-creator',
      title: 'Video Campaign Creator',
      description: 'Create AI-powered video campaigns with ideas',
      icon: '🎬',
      onClick: onLaunchVideoCampaign,
      available: true
    }
  ];

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
      {/* Header */}
      <div className="text-center mb-16">


        <p className="text-6xl text-machine-primary font-bebas mb-3" style={{
          letterSpacing: '0.05em',
          textShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
        }}>
          App Launcher
        </p>


        <p className="text-xl text-machine-tertiary font-inter max-w-2xl mx-auto mb-10">
          Choose your creative module to get started
        </p>
      </div>

      {/* Module Grid */}
      <div className="flex justify-center w-full">
        <div className="max-w-sm">
           {modules.map((module) => (
             <button
               key={module.id}
               onClick={module.available ? module.onClick : undefined}
               disabled={!module.available}
               className={`group relative p-8 rounded-2xl transition-all duration-300 ${module.available
                   ? 'hover:scale-105 cursor-pointer'
                   : 'opacity-50 cursor-not-allowed'
                 }`}
               style={{
                 backgroundColor: module.available ? 'rgba(15, 21, 36, 0.6)' : 'rgba(15, 21, 36, 0.3)',
                 border: module.available ? '2px solid rgba(0, 229, 255, 0.5)' : '2px solid rgba(100, 100, 100, 0.2)',
                 boxShadow: module.available
                   ? '0 0 30px rgba(0, 229, 255, 0.4), 0 0 60px rgba(0, 229, 255, 0.2), inset 0 0 20px rgba(255, 20, 147, 0.08)'
                   : '0 0 10px rgba(100, 100, 100, 0.1)'
               }}
             >
              {/* Neon glow effect for available modules */}
              {module.available && (
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(255, 20, 147, 0.1) 100%)',
                  boxShadow: '0 0 40px rgba(0, 229, 255, 0.3)'
                }}></div>
              )}

              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl" style={{
                  backgroundColor: module.available ? 'rgba(0, 229, 255, 0.1)' : 'rgba(100, 100, 100, 0.1)',
                  border: module.available ? '1px solid rgba(0, 229, 255, 0.3)' : '1px solid rgba(100, 100, 100, 0.2)'
                }}>
                  {module.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-machine-primary font-bebas mb-4">
                  {module.title}
                </h3>

                {/* Description */}
                <p className="text-machine-tertiary font-inter mb-6">
                  {module.description}
                </p>

                {/* Status */}
                <div className="flex items-center justify-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${module.available ? 'bg-success animate-pulse' : 'bg-gray-500'
                    }`}></div>
                  <span className={`text-sm font-medium ${module.available ? 'text-success' : 'text-gray-500'
                    }`}>
                    {module.available ? 'Available' : 'Coming Soon'}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppLauncher;
