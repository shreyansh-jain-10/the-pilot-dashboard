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
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">The Pilot</h1>
                <p className="text-gray-600 text-sm font-medium">AI Video Production</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Script Generator</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">Ready to Create</div>
                <div className="text-xs text-gray-500">AI-Powered Scripts</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">The Pilot</span>
            </div>
            <p className="text-gray-300 text-lg mb-4 font-medium">AI Video Production Pipeline</p>
            <p className="text-gray-400 text-sm mb-6">&copy; 2025 The Pilot. Powered by advanced AI technology</p>
            
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <span>Professional Quality</span>
              <span>•</span>
              <span>AI-Powered</span>
              <span>•</span>
              <span>Customizable</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
