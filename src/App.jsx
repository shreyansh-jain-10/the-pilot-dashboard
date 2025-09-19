import React, { useState, useEffect } from 'react';
import CampaignForm from './components/CampaignForm';
import LoadingScreen from './components/LoadingScreen';
import ScriptReview from './components/ScriptReview';
import { submitCampaign, submitApproval } from './utils/api';

function App() {
  const [currentStep, setCurrentStep] = useState('form'); // 'form', 'loading', 'review'
  const [campaignData, setCampaignData] = useState(null);
  const [scriptData, setScriptData] = useState(null);
  const [approvalUrl, setApprovalUrl] = useState('');
  const [jobId, setJobId] = useState('');
  const [isRevision, setIsRevision] = useState(false);
  const [revisionCount, setRevisionCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

      if (response.success) {
        // Script approved - ready for next agent
        alert('Script approved! Ready for the next agent in the pipeline.');
        // Reset to form for new campaign
        setCurrentStep('form');
        setScriptData(null);
        setCampaignData(null);
        setApprovalUrl('');
        setJobId('');
        setIsRevision(false);
        setRevisionCount(0);
      } else {
        throw new Error(response.message || 'Failed to approve script');
      }
    } catch (err) {
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

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'form':
        return (
          <CampaignForm
            onSubmit={handleCampaignSubmit}
            loading={loading}
          />
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

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{
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
                border: '1px solid rgba(63, 228, 128, 0.3)',
                backdropFilter: 'blur(10px)'
              }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--success)' }}></div>
                <span className="text-sm font-medium font-inter text-machine-primary">Script Generator</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold font-spaceg text-machine-primary">Ready to Create</div>
                <div className="text-xs text-machine-tertiary">AI-Enhanced Series</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

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