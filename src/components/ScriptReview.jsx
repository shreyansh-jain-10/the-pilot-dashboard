import React, { useState } from 'react';
import SceneCard from './SceneCard';
import CharacterCard from './CharacterCard';
import ApprovalButtons from './ApprovalButtons';

const ScriptReview = ({ 
  scriptData, 
  onApprove, 
  onReject, 
  loading, 
  isRevision = false,
  revisionCount = 0,
  onNavigateHome
}) => {
  const [showCharacters, setShowCharacters] = useState(false);

  if (!scriptData) {
    return (
      <div className="text-center py-12">
        <p className="font-inter text-machine-tertiary">No script data available</p>
      </div>
    );
  }

  const { scenes = [], characters = [] } = scriptData;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-8" style={{
          background: 'linear-gradient(135deg, var(--success), var(--acc-cyan))',
          boxShadow: '0 0 30px rgba(63,228,128,0.4), 0 0 60px rgba(0,229,255,0.3)'
        }}>
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#0A0D13' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-5xl font-bold font-spaceg-tight mb-6 text-machine-primary">
          {isRevision ? 'Refined Script' : 'Your Generated Script'}
        </h1>
        <p className="text-xl font-inter max-w-4xl mx-auto leading-relaxed text-machine-secondary">
          {isRevision 
            ? `Revision ${revisionCount + 1} - The Pilot has refined your script based on your feedback`
            : 'The Pilot has created a professional script tailored to your campaign. Review the details below and approve or request changes.'
          }
        </p>
        
        {/* Navigation Button */}
        <div className="mt-8">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center px-6 py-3 rounded-xl font-medium font-inter transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'rgba(126,107,255,0.1)',
              border: '1px solid rgba(126,107,255,0.3)',
              color: 'var(--acc-iris)'
            }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Main Scenes Section */}
        <div className="xl:col-span-3 space-y-6">
          <div className="machine-card p-8" style={{
            backgroundColor: 'rgba(15, 21, 36, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(126, 107, 255, 0.3)'
          }}>
            {/* Scenes Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, var(--acc-iris), var(--acc-cyan))',
                  boxShadow: '0 0 20px rgba(126,107,255,0.3)'
                }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#0A0D13' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-spaceg text-machine-primary">
                    Script Scenes ({scenes.length} scenes)
                  </h2>
                  <p className="text-sm font-inter text-machine-tertiary">
                    Total Duration: {scenes.reduce((total, scene) => total + (scene.duration || 0), 0)}s
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-3 px-4 py-2 rounded-xl" style={{
                backgroundColor: 'rgba(126,107,255,0.1)',
                border: '1px solid rgba(126,107,255,0.3)'
              }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--acc-iris)' }}></div>
                <span className="text-sm font-medium font-spaceg text-machine-primary">Ready for Review</span>
              </div>
            </div>
            
            {/* Scenes Grid */}
            <div className="space-y-6">
              {scenes.map((scene, index) => (
                <div key={index} className="relative">
                  <SceneCard
                    scene={scene}
                    sceneNumber={index + 1}
                    totalScenes={scenes.length}
                  />
                  {index < scenes.length - 1 && (
                    <div className="flex justify-center my-4">
                      <div className="w-px h-6" style={{ backgroundColor: 'rgba(126,107,255,0.3)' }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-2 space-y-6">
          {/* Characters Section */}
          <div className="machine-card p-6" style={{
            backgroundColor: 'rgba(15, 21, 36, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            minHeight: '320px'
          }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                  backgroundColor: 'rgba(0,229,255,0.12)',
                  border: '1px solid var(--acc-cyan)'
                }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--acc-cyan)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-spaceg text-machine-primary">Characters</h3>
                  <p className="text-xs text-machine-tertiary">({characters.length})</p>
                </div>
              </div>
              <button
                onClick={() => setShowCharacters(!showCharacters)}
                className="text-xs font-medium font-inter px-3 py-2 rounded-lg transition-colors"
                style={{ 
                  color: 'var(--acc-cyan)',
                  backgroundColor: 'rgba(0,229,255,0.1)',
                  border: '1px solid rgba(0,229,255,0.2)'
                }}
              >
                {showCharacters ? 'Hide' : 'Show'} Details
              </button>
            </div>
            
            <div className="flex-1">
              {showCharacters ? (
                <div className="space-y-4">
                  {characters.map((character, index) => (
                    <CharacterCard
                      key={character.characterId || index}
                      character={character}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {characters.map((character, index) => (
                    <div key={character.characterId || index} className="flex items-start space-x-4 p-4 rounded-xl transition-colors hover:bg-opacity-20" style={{ 
                      backgroundColor: 'rgba(0,229,255,0.05)',
                      border: '1px solid rgba(0,229,255,0.1)'
                    }}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
                        background: 'linear-gradient(135deg, var(--acc-iris), var(--acc-cyan))'
                      }}>
                        <span className="font-medium text-base font-inter" style={{ color: '#0A0D13' }}>
                          {character.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold font-inter text-machine-primary text-base mb-2">{character.name}</p>
                        <p className="text-sm font-inter text-machine-secondary leading-relaxed line-clamp-3">{character.personality}</p>
                        {character.appearance && (
                          <p className="text-xs font-inter text-machine-tertiary mt-2 line-clamp-2">{character.appearance}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Script Summary */}
          <div className="machine-card p-6" style={{
            backgroundColor: 'rgba(15, 21, 36, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(211, 248, 90, 0.3)'
          }}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                backgroundColor: 'rgba(211,248,90,0.12)',
                border: '1px solid var(--acc-lime)'
              }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--acc-lime)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold font-spaceg text-machine-primary">Script Summary</h3>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'rgba(211,248,90,0.1)' }}>
                <span className="text-sm font-inter text-machine-secondary">Total Scenes:</span>
                <span className="text-lg font-bold font-spaceg text-machine-primary">{scenes.length}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'rgba(211,248,90,0.1)' }}>
                <span className="text-sm font-inter text-machine-secondary">Total Duration:</span>
                <span className="text-lg font-bold font-spaceg text-machine-primary">
                  {scenes.reduce((total, scene) => total + (scene.duration || 0), 0)}s
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'rgba(211,248,90,0.1)' }}>
                <span className="text-sm font-inter text-machine-secondary">Characters:</span>
                <span className="text-lg font-bold font-spaceg text-machine-primary">{characters.length}</span>
              </div>
              {isRevision && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-inter text-machine-secondary">Revision:</span>
                  <span className="text-lg font-bold font-spaceg" style={{ color: 'var(--acc-iris)' }}>#{revisionCount + 1}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quality Indicators */}
          <div className="machine-card p-6" style={{
            backgroundColor: 'rgba(15, 21, 36, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(63, 228, 128, 0.3)'
          }}>
            <h3 className="text-lg font-semibold font-spaceg mb-4 text-machine-primary">Quality Check</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(63,228,128,0.2)' }}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--success)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-inter text-machine-secondary">Narrative Structure</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(63,228,128,0.2)' }}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--success)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-inter text-machine-secondary">Timing Optimized</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(63,228,128,0.2)' }}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--success)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-inter text-machine-secondary">Brand Aligned</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approval Section */}
      <div className="mt-16">
        <ApprovalButtons
          onApprove={onApprove}
          onReject={onReject}
          loading={loading}
          isRevision={isRevision}
        />
      </div>
    </div>
  );
};

export default ScriptReview;