import React, { useState, useRef, useEffect } from 'react';

const CampaignForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    campaignIdea: '',
    tone: 'professional',
    duration: 30,
    scriptRequirements: ''
  });
  const [errors, setErrors] = useState({});
  const [toneDropdownOpen, setToneDropdownOpen] = useState(false);
  const [durationDropdownOpen, setDurationDropdownOpen] = useState(false);
  const toneDropdownRef = useRef(null);
  const durationDropdownRef = useRef(null);

  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'energetic', label: 'Energetic' },
    { value: 'fun', label: 'Fun' },
    { value: 'motivating', label: 'Motivating' },
    { value: 'casual', label: 'Casual' },
    { value: 'dramatic', label: 'Dramatic' }
  ];

  const durationOptions = [
    { value: 8, label: '8 seconds' },
    { value: 12, label: '12 seconds' },
    { value: 16, label: '16 seconds' },
    { value: 20, label: '20 seconds' },
    { value: 24, label: '24 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 35, label: '35 seconds' },
    { value: 40, label: '40 seconds' }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toneDropdownRef.current && !toneDropdownRef.current.contains(event.target)) {
        setToneDropdownOpen(false);
      }
      if (durationDropdownRef.current && !durationDropdownRef.current.contains(event.target)) {
        setDurationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDropdownSelect = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'tone') {
      setToneDropdownOpen(false);
    } else if (name === 'duration') {
      setDurationDropdownOpen(false);
    }
  };

  const getSelectedLabel = (name) => {
    if (name === 'tone') {
      return toneOptions.find(option => option.value === formData.tone)?.label || 'Professional';
    } else if (name === 'duration') {
      return durationOptions.find(option => option.value === formData.duration)?.label || '30 seconds';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.campaignIdea.trim()) {
      newErrors.campaignIdea = 'Campaign idea is required';
    }
    
    if (formData.campaignIdea.trim().length < 10) {
      newErrors.campaignIdea = 'Campaign idea must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Ensure duration is a number
      const submitData = {
        ...formData,
        duration: parseInt(formData.duration, 10)
      };
      onSubmit(submitData);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        
        <h1 className="text-6xl font-bold font-bebas tracking-tight mb-8 text-machine-primary" style={{ 
          letterSpacing: '-0.02em'
        }}>
          THE MACHINE
        </h1>
        <h2 className="text-4xl font-bold font-spaceg-tight mb-6 text-machine-primary" style={{ 
          letterSpacing: '-0.015em'
        }}>
          Create Your Video Campaign
        </h2>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed font-inter text-machine-secondary">
          Describe your vision and let THE MACHINE's advanced AI generate a professional, 
          engaging script perfectly tailored to your brand and audience.
        </p>
        
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-8 text-sm font-inter text-machine-tertiary">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success)' }}></div>
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--acc-cyan)' }}></div>
              <span>Professional Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--acc-iris)' }}></div>
              <span>Customizable</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="machine-card overflow-hidden" style={{
          backgroundColor: 'rgba(15, 21, 36, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(126, 107, 255, 0.3)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(126, 107, 255, 0.1), 0 0 30px rgba(126, 107, 255, 0.2), 0 0 60px rgba(0, 229, 255, 0.1)'
        }}>
          {/* Form Header */}
          <div className="machine-header-gradient px-8 py-6 border-b" style={{ 
            borderColor: 'rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(126, 107, 255, 0.05)',
            backdropFilter: 'blur(10px)'
          }}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ 
                backgroundColor: 'rgba(126,107,255,0.12)',
                border: '1px solid var(--acc-iris)'
              }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--acc-iris)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold font-spaceg text-machine-primary">Campaign Details</h2>
                <p className="text-sm font-inter text-machine-tertiary">Tell us about your video vision</p>
              </div>
            </div>
          </div>
          
          {/* Form Content */}
          <div className="p-8 space-y-8">
            <div>
              <label htmlFor="campaignIdea" className="block text-lg font-bold mb-4 flex items-center font-spaceg text-machine-primary">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{ 
                  backgroundColor: 'rgba(126,107,255,0.12)',
                  border: '1px solid var(--acc-iris)'
                }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--acc-iris)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                Campaign Idea *
              </label>
              <textarea
                id="campaignIdea"
                name="campaignIdea"
                value={formData.campaignIdea}
                onChange={handleChange}
                rows={5}
                className={`w-full px-6 py-4 rounded-2xl focus:outline-none transition-all duration-300 resize-none font-inter machine-input ${
                  errors.campaignIdea 
                    ? 'border-danger bg-red-500/10' 
                    : ''
                }`}
                style={{
                  backgroundColor: errors.campaignIdea ? 'rgba(255,94,102,0.1)' : 'rgba(15, 21, 36, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderColor: errors.campaignIdea ? 'var(--danger)' : 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                placeholder="Describe your video campaign concept, target audience, and key message. Be as detailed as possible to help The Pilot create the perfect script for you..."
              />
              {errors.campaignIdea && (
                <p className="mt-3 text-sm flex items-center font-medium font-inter" style={{ color: 'var(--danger)' }}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.campaignIdea}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="tone" className="block text-lg font-bold mb-4 flex items-center font-spaceg text-machine-primary">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{ 
                    backgroundColor: 'rgba(0,229,255,0.12)',
                    border: '1px solid var(--acc-cyan)'
                  }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--acc-cyan)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Tone & Style
                </label>
                <div className="relative" ref={toneDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setToneDropdownOpen(!toneDropdownOpen)}
                    className="w-full px-6 py-4 rounded-2xl focus:outline-none transition-all duration-300 font-inter machine-input flex items-center justify-between"
                    style={{
                      backgroundColor: 'rgba(15, 21, 36, 0.6)',
                      backdropFilter: 'blur(10px)',
                      borderColor: 'rgba(0, 229, 255, 0.2)',
                      color: 'var(--text-primary)',
                      border: '1px solid rgba(0, 229, 255, 0.2)'
                    }}
                  >
                    <span>{getSelectedLabel('tone')}</span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${toneDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {toneDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 rounded-2xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto" style={{
                      backgroundColor: 'rgba(15, 21, 36, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(0, 229, 255, 0.3)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0, 229, 255, 0.1)'
                    }}>
                      {toneOptions.map((option, index) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleDropdownSelect('tone', option.value)}
                          className={`w-full px-6 py-3 text-left hover:bg-opacity-20 transition-colors duration-200 font-inter ${
                            formData.tone === option.value ? 'bg-cyan-500 bg-opacity-20' : 'hover:bg-cyan-500'
                          }`}
                          style={{
                            color: 'var(--text-primary)',
                            borderBottom: index < toneOptions.length - 1 ? '1px solid rgba(0, 229, 255, 0.1)' : 'none'
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="duration" className="block text-lg font-bold mb-4 flex items-center font-spaceg text-machine-primary">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{ 
                    backgroundColor: 'rgba(126,107,255,0.12)',
                    border: '1px solid var(--acc-iris)'
                  }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--acc-iris)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Video Duration
                </label>
                <div className="relative" ref={durationDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDurationDropdownOpen(!durationDropdownOpen)}
                    className="w-full px-6 py-4 rounded-2xl focus:outline-none transition-all duration-300 font-inter machine-input flex items-center justify-between"
                    style={{
                      backgroundColor: 'rgba(15, 21, 36, 0.6)',
                      backdropFilter: 'blur(10px)',
                      borderColor: 'rgba(126, 107, 255, 0.2)',
                      color: 'var(--text-primary)',
                      border: '1px solid rgba(126, 107, 255, 0.2)'
                    }}
                  >
                    <span>{getSelectedLabel('duration')}</span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${durationDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {durationDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 rounded-2xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto" style={{
                      backgroundColor: 'rgba(15, 21, 36, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(126, 107, 255, 0.3)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(126, 107, 255, 0.1)'
                    }}>
                      {durationOptions.map((option, index) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleDropdownSelect('duration', option.value)}
                          className={`w-full px-6 py-3 text-left hover:bg-opacity-20 transition-colors duration-200 font-inter ${
                            formData.duration === option.value ? 'bg-purple-500 bg-opacity-20' : 'hover:bg-purple-500'
                          }`}
                          style={{
                            color: 'var(--text-primary)',
                            borderBottom: index < durationOptions.length - 1 ? '1px solid rgba(126, 107, 255, 0.1)' : 'none'
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="scriptRequirements" className="block text-lg font-bold mb-4 flex items-center font-spaceg text-machine-primary">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{ 
                  backgroundColor: 'rgba(211,248,90,0.12)',
                  border: '1px solid var(--acc-lime)'
                }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--acc-lime)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Additional Requirements
                <span className="ml-2 text-sm font-normal font-inter text-machine-tertiary">(Optional)</span>
              </label>
              <textarea
                id="scriptRequirements"
                name="scriptRequirements"
                value={formData.scriptRequirements}
                onChange={handleChange}
                rows={4}
                className="w-full px-6 py-4 rounded-2xl focus:outline-none transition-all duration-300 resize-none font-inter machine-input"
                style={{
                  backgroundColor: 'rgba(15, 21, 36, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'rgba(211, 248, 90, 0.2)',
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(211, 248, 90, 0.2)'
                }}
                placeholder="Any specific requirements, must-say lines, special instructions, or brand guidelines, you'd like The Pilot to follow..."
              />
            </div>

          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-8">
          <button
            type="submit"
            disabled={loading}
            className={`group relative px-16 py-5 text-xl font-bold rounded-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${
              loading 
                ? 'cursor-not-allowed' 
                : 'machine-cta hover:machine-cta-hover'
            }`}
            style={loading ? {
              backgroundColor: '#2A3450',
              color: '#8390AD',
              boxShadow: 'none'
            } : {}}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="loading-spinner mr-4 w-6 h-6" style={{ borderTopColor: '#8390AD' }}></div>
                <span className="font-spaceg">Generating Your Script...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <svg className="w-7 h-7 mr-4 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-spaceg">Generate My Script</span>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;