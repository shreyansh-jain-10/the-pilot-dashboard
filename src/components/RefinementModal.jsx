import React, { useState } from 'react';

const RefinementModal = ({ 
  character, 
  onClose, 
  onSubmit, 
  loading 
}) => {
  const [feedback, setFeedback] = useState('');

  const getCharacterName = (uniqueKey) => {
    // Extract character name from unique_character_key
    const parts = uniqueKey.split('_');
    if (parts.length > 2) {
      return parts.slice(2).join(' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    return 'Character';
  };

  const handleSubmit = () => {
    if (feedback.trim() && character) {
      onSubmit(character.unique_character_key, character.imageUrl, feedback, character.character_id);
      onClose();
    }
  };

  const handleClose = () => {
    setFeedback('');
    onClose();
  };

  if (!character) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="machine-card p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-machine-primary mb-2">
            Refine Character
          </h3>
          <p className="text-sm text-machine-secondary">
            {getCharacterName(character.unique_character_key)}
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="refinement-feedback" className="block text-sm font-medium mb-2 text-machine-secondary">
              What would you like to change about this character?
            </label>
            <textarea
              id="refinement-feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="w-full px-3 py-3 rounded-lg machine-input resize-none"
              placeholder="Describe the changes you'd like to see in this character..."
            />
          </div>
          
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleClose}
              disabled={loading}
              className="px-6 py-2 text-sm font-medium rounded-lg"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !feedback.trim()}
              className={`px-6 py-2 text-sm font-medium rounded-lg ${
                loading || !feedback.trim()
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              style={{
                backgroundColor: loading || !feedback.trim() ? 'var(--bg-3)' : 'var(--acc-cyan)',
                color: loading || !feedback.trim() ? 'var(--text-tertiary)' : '#0A0D13',
                border: 'none'
              }}
            >
              {loading ? 'Submitting...' : 'Submit Refinement'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefinementModal;
