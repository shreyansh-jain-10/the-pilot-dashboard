import React, { useState } from 'react';
import RefinementModal from './RefinementModal';
import ErrorModal from './ErrorModal';

const CharacterReview = ({ 
  characterData, 
  onRefine, 
  onApproveAll, 
  loading, 
  onNavigateHome 
}) => {
  const [refiningCharacter, setRefiningCharacter] = useState(null);
  const [refiningCharacters, setRefiningCharacters] = useState(new Set()); // Track which characters are being refined
  const [imageVersions, setImageVersions] = useState({}); // Track image versions for cache busting
  const [errorModal, setErrorModal] = useState({ isOpen: false, error: null, characterKey: null });

  if (!characterData || !characterData.data) {
    return (
      <div className="text-center py-12">
        <p className="font-inter text-machine-tertiary">No character data available</p>
      </div>
    );
  }

  const { data: characters } = characterData;

  const handleRefine = (character) => {
    setRefiningCharacter(character);
  };

  const handleCloseRefinement = () => {
    setRefiningCharacter(null);
  };

  const handleSubmitRefinement = async (uniqueKey, imageUrl, feedback, characterId) => {
    // Add character to refining set
    setRefiningCharacters(prev => new Set([...prev, uniqueKey]));
    
    try {
      // Call the parent's onRefine function
      await onRefine(uniqueKey, imageUrl, feedback, characterId);
      
      // Update image version for cache busting only after successful refinement
      setImageVersions(prev => ({
        ...prev,
        [uniqueKey]: Date.now()
      }));
    } catch (error) {
      console.error('Refinement failed:', error);
      
      // Parse error message from the response structure you provided
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (error.message) {
        // If error has a message property, use it
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        // If error is a string, use it directly
        errorMessage = error;
      }
      
      // Show error modal
      setErrorModal({
        isOpen: true,
        error: errorMessage,
        characterKey: uniqueKey
      });
    } finally {
      // Remove character from refining set
      setRefiningCharacters(prev => {
        const newSet = new Set(prev);
        newSet.delete(uniqueKey);
        return newSet;
      });
    }
    
    setRefiningCharacter(null);
  };

  const handleCloseErrorModal = () => {
    setErrorModal({ isOpen: false, error: null, characterKey: null });
  };

  const getCharacterName = (character) => {
    // First try to get name from character.name if it exists
    if (character?.name) {
      return character.name;
    }
    
    // Otherwise, extract from unique_character_key or character_id
    const keyToUse = character?.unique_character_key || character?.character_id || '';
    const parts = keyToUse.split('_');
    
    if (parts.length > 2) {
      // Get the last part after the job ID and random string (e.g., "main_character")
      const characterPart = parts.slice(2).join('_');
      return characterPart
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
    } else if (character?.character_id) {
      // Fallback to character_id
      return character.character_id
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
    }
    
    return 'Character';
  };

  const getImageUrl = (character) => {
    const version = imageVersions[character.unique_character_key];
    return version ? `${character.imageUrl}?v=${version}` : character.imageUrl;
  };

  const isCharacterRefining = (uniqueKey) => {
    return refiningCharacters.has(uniqueKey);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-machine-primary">
          Character References
        </h1>
        <p className="text-lg text-machine-secondary mb-6">
          Review and refine character references as needed.
        </p>
        
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
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

      {/* Characters Grid */}
      <div className="mb-12">
        <div className="machine-card p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-machine-primary mb-2">
              Generated Characters ({characters.length})
            </h2>
            <p className="text-machine-tertiary">
              Review and refine character references as needed
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character) => {
              const isRefining = isCharacterRefining(character.unique_character_key);
              
              return (
                <div 
                  key={character.unique_character_key} 
                  className={`machine-card p-4 transition-all duration-300 ${
                    isRefining ? 'ring-2 ring-cyan-400 ring-opacity-50' : ''
                  }`}
                >
                  {/* Character Image */}
                  <div className="aspect-square rounded-xl mb-4 overflow-hidden bg-gray-800 relative">
                    {/* Loading overlay for refining character */}
                    {isRefining && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                        <div className="text-center">
                          <div className="loading-spinner w-8 h-8 mb-2 mx-auto"></div>
                          <p className="text-sm text-white font-medium">Refining...</p>
                        </div>
                      </div>
                    )}
                    
                    <img
                      key={`${character.unique_character_key}-${imageVersions[character.unique_character_key] || 'original'}`}
                      src={getImageUrl(character)}
                      alt={getCharacterName(character)}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        isRefining ? 'opacity-70' : 'opacity-100'
                      }`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                      onLoad={(e) => {
                        e.target.style.display = 'block';
                        e.target.nextSibling.style.display = 'none';
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center bg-gray-700" style={{ display: 'none' }}>
                      <div className="text-center">
                        <svg className="w-12 h-12 mx-auto mb-2 text-machine-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-machine-tertiary">Image Loading...</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Character Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-machine-primary mb-2">
                      {getCharacterName(character)}
                    </h3>
                    <p className="text-xs text-machine-tertiary font-mono">
                      {character.character_id || 'Unknown ID'}
                    </p>
                  </div>
                  
                  {/* Refine Button */}
                  <button
                    onClick={() => handleRefine(character)}
                    disabled={loading || isRefining || refiningCharacters.size > 0}
                    className={`w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      !loading && !isRefining && refiningCharacters.size === 0 ? 'hover:scale-105' : 'cursor-not-allowed opacity-50'
                    }`}
                    style={{
                      backgroundColor: isRefining 
                        ? 'rgba(126,107,255,0.1)' 
                        : refiningCharacters.size > 0 && !isRefining
                        ? 'rgba(111,122,145,0.1)'
                        : 'rgba(0,229,255,0.1)',
                      border: isRefining 
                        ? '1px solid rgba(126,107,255,0.3)' 
                        : refiningCharacters.size > 0 && !isRefining
                        ? '1px solid rgba(111,122,145,0.3)'
                        : '1px solid rgba(0,229,255,0.3)',
                      color: isRefining 
                        ? 'var(--acc-iris)' 
                        : refiningCharacters.size > 0 && !isRefining
                        ? 'var(--text-tertiary)'
                        : 'var(--acc-cyan)'
                    }}
                  >
                    <div className="flex items-center justify-center">
                      {isRefining ? (
                        <>
                          <div className="loading-spinner w-4 h-4 mr-2"></div>
                          <span>Refining...</span>
                        </>
                      ) : refiningCharacters.size > 0 && !isRefining ? (
                        <>
                          <svg className="w-4 h-4 mr-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span>Wait...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Refine Character
                        </>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        error={errorModal.error}
        onClose={handleCloseErrorModal}
        title="Character Refinement Failed"
      />

      {/* Refinement Modal */}
      <RefinementModal
        character={refiningCharacter}
        onClose={handleCloseRefinement}
        onSubmit={handleSubmitRefinement}
        loading={loading}
      />

      {/* Approval Section */}
      <div className="mt-12 text-center">
        <div className="mb-4">
          <p className="text-machine-secondary text-sm">
            {refiningCharacters.size > 0 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium mr-2">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {refiningCharacters.size} character{refiningCharacters.size > 1 ? 's' : ''} being refined
              </span>
            )}
          </p>
        </div>
        
        <button
          onClick={onApproveAll}
          disabled={loading || refiningCharacters.size > 0}
          className={`px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
            loading || refiningCharacters.size > 0
              ? 'cursor-not-allowed opacity-50' 
              : 'machine-cta hover:machine-cta-hover'
          }`}
        >
          {loading ? (
            <div className="flex items-center">
              <div className="loading-spinner mr-3"></div>
              <span>Processing...</span>
            </div>
          ) : refiningCharacters.size > 0 ? (
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Wait for refinements to complete</span>
            </div>
          ) : (
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Approve All Characters</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default CharacterReview;