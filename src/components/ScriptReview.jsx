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
  revisionCount = 0 
}) => {
  const [showCharacters, setShowCharacters] = useState(false);

  if (!scriptData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No script data available</p>
      </div>
    );
  }

  const { scenes = [], characters = [] } = scriptData;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {isRevision ? 'Refined Script' : 'Your Generated Script'}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {isRevision 
            ? `Revision ${revisionCount + 1} - The Pilot has refined your script based on your feedback`
            : 'The Pilot has created a professional script tailored to your campaign. Review the details below and approve or request changes.'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scenes Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Script Scenes ({scenes.length} scenes)
              </h2>
              <div className="text-sm text-gray-500">
                Total Duration: {scenes.reduce((total, scene) => total + (scene.duration || 0), 0)}s
              </div>
            </div>
            
            <div className="space-y-4">
              {scenes.map((scene, index) => (
                <SceneCard
                  key={index}
                  scene={scene}
                  sceneNumber={index + 1}
                  totalScenes={scenes.length}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Characters Section */}
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Characters ({characters.length})
              </h2>
              <button
                onClick={() => setShowCharacters(!showCharacters)}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                {showCharacters ? 'Hide' : 'Show'} Details
              </button>
            </div>
            
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
              <div className="space-y-2">
                {characters.map((character, index) => (
                  <div key={character.characterId || index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-medium text-sm">
                        {character.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{character.name}</p>
                      <p className="text-sm text-gray-500">{character.personality}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Script Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Scenes:</span>
                <span className="font-medium">{scenes.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Duration:</span>
                <span className="font-medium">
                  {scenes.reduce((total, scene) => total + (scene.duration || 0), 0)}s
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Characters:</span>
                <span className="font-medium">{characters.length}</span>
              </div>
              {isRevision && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Revision:</span>
                  <span className="font-medium text-primary-600">#{revisionCount + 1}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Approval Section */}
      <div className="mt-12">
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
