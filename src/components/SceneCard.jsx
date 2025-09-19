import React, { useState } from 'react';

const SceneCard = ({ scene, sceneNumber, totalScenes }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="machine-card p-6 hover:shadow-xl transition-all duration-300" style={{
      backgroundColor: 'rgba(17, 22, 35, 0.6)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(126, 107, 255, 0.2)',
      borderRadius: '16px'
    }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-sm font-bold px-4 py-2 rounded-full shadow-lg" style={{
            background: 'linear-gradient(135deg, var(--acc-iris), var(--acc-cyan))',
            color: '#0A0D13'
          }}>
            Scene {sceneNumber}
          </div>
          <div className="text-sm font-medium px-3 py-1 rounded-full font-inter" style={{
            backgroundColor: 'rgba(126,107,255,0.1)',
            color: 'var(--acc-iris)',
            border: '1px solid rgba(126,107,255,0.3)'
          }}>
            {scene.duration}s
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
          style={{
            color: 'var(--text-tertiary)',
            backgroundColor: 'rgba(126,107,255,0.1)',
            border: '1px solid rgba(126,107,255,0.2)'
          }}
        >
          {isExpanded ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3 flex items-center font-spaceg text-machine-primary">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{
              backgroundColor: 'rgba(126,107,255,0.12)',
              border: '1px solid var(--acc-iris)'
            }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--acc-iris)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            Story Beat
          </h4>
          <p className="leading-relaxed font-inter text-machine-secondary pl-11">{scene.storyBeat}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 flex items-center font-spaceg text-machine-primary">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{
              backgroundColor: 'rgba(0,229,255,0.12)',
              border: '1px solid var(--acc-cyan)'
            }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--acc-cyan)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            Visual Description
          </h4>
          <p className="leading-relaxed font-inter text-machine-secondary pl-11">{scene.shotDescription}</p>
        </div>

        {isExpanded && (
          <div className="space-y-6 pt-6" style={{ borderTop: '1px solid rgba(126,107,255,0.2)' }}>
            <div>
              <h4 className="font-semibold mb-3 flex items-center font-spaceg text-machine-primary">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{
                  backgroundColor: 'rgba(211,248,90,0.12)',
                  border: '1px solid var(--acc-lime)'
                }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--acc-lime)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                </div>
                Camera Notes
              </h4>
              <p className="leading-relaxed font-inter text-machine-secondary pl-11">{scene.cameraNotes}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center font-spaceg text-machine-primary">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{
                  backgroundColor: 'rgba(63,228,128,0.12)',
                  border: '1px solid var(--success)'
                }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--success)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                Dialogue
              </h4>
              <div className="rounded-2xl p-6 ml-11" style={{
                background: 'linear-gradient(135deg, rgba(126,107,255,0.15), rgba(0,229,255,0.10))',
                border: '1px solid rgba(126,107,255,0.3)',
                backdropFilter: 'blur(10px)'
              }}>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{
                    background: 'linear-gradient(135deg, var(--acc-iris), var(--acc-cyan))'
                  }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#0A0D13' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <p className="italic leading-relaxed font-inter text-machine-primary">"{scene.voDialogue}"</p>
                </div>
              </div>
            </div>

            {scene.sfx && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center font-spaceg text-machine-primary">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{
                    backgroundColor: 'rgba(255,196,77,0.12)',
                    border: '1px solid var(--warning)'
                  }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--warning)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  Sound Effects
                </h4>
                <p className="leading-relaxed font-inter text-machine-secondary pl-11">{scene.sfx}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneCard;