import React, { useState, useEffect } from 'react';
import OrbAssistant from './components/OrbAssistant';
import TuneMachine from './components/TuneMachine';
import AppLauncher from './components/AppLauncher';
import CampaignForm from './components/CampaignForm';
import LoadingScreen from './components/LoadingScreen';
import ScriptReview from './components/ScriptReview';
import CharacterReview from './components/CharacterReview';
import { submitCampaign, submitApproval } from './utils/api';

function App() {
  const [currentStep, setCurrentStep] = useState('orb'); // 'orb', 'tune', 'launcher', 'form', 'loading', 'review', 'agent2Loading', 'characterReview'
  const [campaignData, setCampaignData] = useState(null);
  const [scriptData, setScriptData] = useState(null);
  const [approvalUrl, setApprovalUrl] = useState('');
  const [jobId, setJobId] = useState('');
  const [isRevision, setIsRevision] = useState(false);
  const [revisionCount, setRevisionCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Agent 2 states
  const [agent2Loading, setAgent2Loading] = useState(false);
  const [showCharacterReview, setShowCharacterReview] = useState(false);
  const [characterData, setCharacterData] = useState(null);
  const [approvalWebhook, setApprovalWebhook] = useState('');

  const handleCampaignSubmit = async (formData) => {
    setLoading(true);
    setError('');
    setCampaignData(formData);
    setCurrentStep('loading');

    try {
      const response = await submitCampaign(formData);

      if (response.success) {
        setScriptData(response.data);
        setApprovalUrl(response.approvalUrl);
        setJobId(response.jobId);
        setIsRevision(response.isRevision || false);
        setCurrentStep('review');
      } else {
        throw new Error(response.message || 'Failed to generate script');
      }
    } catch (err) {
      setError(err.message);
      setCurrentStep('form');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await submitApproval(approvalUrl, {
        approved: true,
        feedback: ''
      });

      console.log('Script approval response:', response);

      // Check if response has character data (successful approval)
      if (response.data && Array.isArray(response.data) && response.approvalWebhook) {
        // Script approved - Agent 2 has already generated characters
        setCharacterData(response);
        setApprovalWebhook(response.approvalWebhook);
        setAgent2Loading(false);
        setShowCharacterReview(true);
        setCurrentStep('characterReview');
      } else if (response.success) {
        // Fallback for old API format - trigger Agent 2 (character generation)
        setAgent2Loading(true);
        setCurrentStep('agent2Loading');
        
        // Simulate Agent 2 processing time
        setTimeout(() => {
          // Mock character data for development
          const mockCharacterData = {
            data: [
              {
                success: true,
                imageUrl: "https://the-pilot-bucket.s3.eu-north-1.amazonaws.com/multi-angle-images/job_1758578960647_el5b85zyr_main_character.png",
                s3Key: "multi-angle-images/job_1758578960647_el5b85zyr_main_character.png",
                unique_character_key: "job_1758578960647_el5b85zyr_main_character",
                character_id: "main_character"
              },
              {
                success: true,
                imageUrl: "https://the-pilot-bucket.s3.eu-north-1.amazonaws.com/multi-angle-images/job_1758578960647_el5b85zyr_supporting_character.png",
                s3Key: "multi-angle-images/job_1758578960647_el5b85zyr_supporting_character.png",
                unique_character_key: "job_1758578960647_el5b85zyr_supporting_character",
                character_id: "supporting_character"
              }
            ],
            approvalWebhook: "https://gluagents.xyz/webhook-waiting/59373",
            jobId: "job_1758578960647_el5b85zyr"
          };
          
          setCharacterData(mockCharacterData);
          setApprovalWebhook(mockCharacterData.approvalWebhook);
          setAgent2Loading(false);
          setShowCharacterReview(true);
          setCurrentStep('characterReview');
        }, 3000);
      } else {
        throw new Error(response.message || 'Failed to approve script');
      }
    } catch (err) {
      console.error('Script approval error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRejection = async (feedback) => {
    setLoading(true);
    setError('');

    try {
      const response = await submitApproval(approvalUrl, {
        approved: false,
        feedback: feedback
      });

      if (response.success) {
        // Script refinement requested
        setScriptData(response.data);
        setApprovalUrl(response.approvalUrl);
        setIsRevision(true);
        setRevisionCount(prev => prev + 1);
        setCurrentStep('loading');

        // Simulate loading time for refinement
        setTimeout(() => {
          setCurrentStep('review');
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to submit feedback');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError('');
    setCurrentStep('form');
  };

  // Navigation handlers for new pages
  const handleOrbNext = () => {
    setCurrentStep('tune');
  };

  const handleTuneNext = () => {
    setCurrentStep('launcher');
  };

  const handleLaunchVideoCampaign = () => {
    setCurrentStep('form');
  };

  const handleHome = () => {
    setCurrentStep('orb');
  };

  // Improved character refinement handler
  const handleCharacterRefinement = async (characterKey, imageUrl, feedback, characterId) => {
    console.log('Starting character refinement for:', characterKey);
    
    try {
      const response = await submitApproval(approvalWebhook, {
        action: "refine",
        feedback: feedback,
        unique_character_key: characterKey,
        imageUrl: imageUrl,
        character_id: characterId,
        jobId: jobId
      });

      console.log('Character refinement response:', response);

      // Handle the specific error format you mentioned
      if (Array.isArray(response) && response.length > 0) {
        const firstResponse = response[0];
        if (firstResponse.success === false && firstResponse.error) {
          // Extract error message from the nested error object
          let errorMessage = 'Failed to refine character';
          
          if (firstResponse.error.Error) {
            errorMessage = firstResponse.error.Error;
          } else if (typeof firstResponse.error === 'string') {
            errorMessage = firstResponse.error;
          } else if (typeof firstResponse.error === 'object') {
            // Try to find any error message in the error object
            const errorValues = Object.values(firstResponse.error);
            if (errorValues.length > 0 && typeof errorValues[0] === 'string') {
              errorMessage = errorValues[0];
            }
          }
          
          throw new Error(errorMessage);
        }
      }

      // Check if response indicates successful refinement
      if (response.success && response.imageUrl) {
        // Update character data with refined image
        setCharacterData(prev => {
          const updatedData = prev.data.map(char => {
            if (char.unique_character_key === characterKey) {
              console.log('Updating character image:', char.imageUrl, '->', response.imageUrl);
              return { 
                ...char, 
                imageUrl: response.imageUrl,
                character_id: response.character_id || char.character_id
              };
            }
            return char;
          });
          return {
            ...prev,
            data: updatedData
          };
        });
        
        return Promise.resolve(); // Indicate successful refinement
      } else if (response.data && Array.isArray(response.data)) {
        // Fallback for old API format with data array
        const refinedCharacter = response.data.find(char => 
          char.unique_character_key === characterKey || char.character_id === characterId
        );
        
        if (refinedCharacter) {
          setCharacterData(prev => ({
            ...prev,
            data: prev.data.map(char => 
              char.unique_character_key === characterKey 
                ? { ...char, imageUrl: refinedCharacter.imageUrl }
                : char
            )
          }));
          return Promise.resolve(); // Indicate successful refinement
        }
      }
      
      throw new Error(response.message || 'Failed to refine character');
    } catch (err) {
      console.error('Character refinement error:', err);
      throw err; // Re-throw to be caught by the CharacterReview component
    }
  };

  const handleApproveAllCharacters = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await submitApproval(approvalWebhook, {
        action: "approve_all",
        jobId: jobId
      });

      console.log('Approve all characters response:', response);

      // Check if response indicates success (various possible formats)
      if (response.success || response.data || response.message === 'success' || response.status === 'success') {
        // All characters approved - ready for next agent or complete
        alert('All characters approved! Ready for the next agent in the pipeline.');
        // Reset to form for new campaign
        setCurrentStep('form');
        setScriptData(null);
        setCampaignData(null);
        setApprovalUrl('');
        setJobId('');
        setIsRevision(false);
        setRevisionCount(0);
        setCharacterData(null);
        setApprovalWebhook('');
        setShowCharacterReview(false);
        setAgent2Loading(false);
      } else {
        throw new Error(response.message || 'Failed to approve characters');
      }
    } catch (err) {
      console.error('Approve all characters error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'orb':
        return (
          <OrbAssistant
            onNext={handleOrbNext}
          />
        );

      case 'tune':
        return (
          <TuneMachine
            onNext={handleTuneNext}
            onHome={handleHome}
          />
        );

      case 'launcher':
        return (
          <AppLauncher
            onLaunchVideoCampaign={handleLaunchVideoCampaign}
            onHome={handleHome}
          />
        );

      case 'form':
        return (
          <div className="relative">
            {/* Home Button for Campaign Form */}
            <button
              onClick={handleHome}
              className="absolute top-4 left-4 z-10 group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
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
            <CampaignForm
              onSubmit={handleCampaignSubmit}
              loading={loading}
            />
          </div>
        );

      case 'loading':
        return (
          <LoadingScreen
            message={isRevision ? "Refining your script..." : "Generating your script..."}
          />
        );

      case 'review':
        return (
          <ScriptReview
            scriptData={scriptData}
            onApprove={handleApproval}
            onReject={handleRejection}
            loading={loading}
            isRevision={isRevision}
            revisionCount={revisionCount}
            onNavigateHome={() => setCurrentStep('form')}
          />
        );

      case 'agent2Loading':
        return (
          <LoadingScreen
            message="Generating character references..."
          />
        );

      case 'characterReview':
        return (
          <CharacterReview
            characterData={characterData}
            onRefine={handleCharacterRefinement}
            onApproveAll={handleApproveAllCharacters}
            loading={loading}
            onNavigateHome={() => setCurrentStep('form')}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={`${currentStep === 'orb' || currentStep === 'tune' || currentStep === 'launcher' ? 'h-screen overflow-hidden' : 'min-h-screen'}`} style={{
      backgroundColor: 'var(--bg-0)',
      backgroundImage: `
        radial-gradient(1200px 900px at 15% -15%, rgba(255,20,147,.18) 0%, rgba(126,107,255,.15) 25%, transparent 70%),
        radial-gradient(1000px 700px at 85% -5%, rgba(0,255,127,.12) 0%, rgba(0,229,255,.15) 30%, transparent 75%),
        radial-gradient(800px 600px at 50% 100%, rgba(255,105,180,.08) 0%, transparent 60%),
        radial-gradient(circle at 25% 25%, rgba(255,255,255,0.015) 0%, transparent 50%),
        radial-gradient(circle at 75% 25%, rgba(255,255,255,0.01) 0%, transparent 50%),
        radial-gradient(circle at 25% 75%, rgba(255,255,255,0.01) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(255,255,255,0.015) 0%, transparent 50%)
      `,
      position: 'relative'
    }}>
      {/* Sticky Header */}
      <div className="sticky-header w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold font-bebas tracking-tight text-machine-primary">THE MACHINE</h1>
                <p className="text-sm font-medium text-machine-tertiary">AI Video Production</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 rounded-full px-4 py-2" style={{
                backgroundColor: 'rgba(15, 21, 36, 0.8)',
                border: currentStep === 'characterReview' ? '1px solid rgba(0, 229, 255, 0.3)' : '1px solid rgba(63, 228, 128, 0.3)',
                backdropFilter: 'blur(10px)'
              }}>
                <div 
                  className="w-2 h-2 rounded-full animate-pulse" 
                  style={{ 
                    backgroundColor: currentStep === 'characterReview' ? 'var(--acc-cyan)' : 'var(--success)'
                  }}
                ></div>
                <span className="text-sm font-medium font-inter text-machine-primary">
                  {currentStep === 'characterReview' ? 'Character Generator' : 
                   currentStep === 'orb' ? 'Welcome' :
                   currentStep === 'tune' ? 'Tune the MACHINE' :
                   currentStep === 'launcher' ? 'App launcher' : 'Script Generator'}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold font-spaceg text-machine-primary">
                  {currentStep === 'characterReview' ? 'Character Generation' : 
                   currentStep === 'orb' ? 'Welcome to THE MACHINE' :
                   currentStep === 'tune' ? 'Brand Identity Setup' :
                   currentStep === 'launcher' ? 'Choose Your Module' : 'Ready to Create'}
                </div>
                <div className="text-xs text-machine-tertiary">
                  {currentStep === 'characterReview' ? 'AI-Enhanced Characters' : 
                   currentStep === 'orb' ? 'Your AI Creative Companion' :
                   currentStep === 'tune' ? 'Upload and Manage Assets' :
                   currentStep === 'launcher' ? 'Select Creative Tools' : 'AI-Enhanced Series'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`max-w-7xl mx-auto px-6 lg:px-8 ${currentStep === 'orb' || currentStep === 'tune' || currentStep === 'launcher' ? 'h-full flex flex-col' : 'py-8'}`}>
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                <div className="mt-3">
                  <button
                    onClick={handleRetry}
                    className="text-sm font-medium text-red-800 hover:text-red-700 underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {renderCurrentStep()}
      </div>
    </div>
  );
}

export default App;