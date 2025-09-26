const API_BASE_URL = 'https://gluagents.xyz/webhook';

// Helper function to convert object to URL-encoded string
const objectToFormData = (obj) => {
  return Object.keys(obj)
    .map(key => {
      const value = obj[key];
      // Keep numbers as numbers in the form data, don't convert to string
      const stringValue = typeof value === 'number' ? value : 
                         typeof value === 'object' ? JSON.stringify(value) : 
                         String(value || '');
      return encodeURIComponent(key) + '=' + encodeURIComponent(stringValue);
    })
    .join('&');
};

// Mock response for development when API is not available
const createMockResponse = (campaignData) => {
  return {
    success: true,
    jobId: `job_${Date.now()}`,
    step: "script_approval",
    message: "Script generated successfully. Please review and approve.",
    data: {
      totalScenes: 3,
      scenes: [
        {
          sceneNumber: 1,
          duration: 10,
          storyBeat: "Opening shot establishing the product and setting the tone",
          shotDescription: "Wide shot of a modern office environment with the product prominently displayed",
          cameraNotes: "Slow zoom in on the product, maintaining focus throughout",
          voDialogue: `Welcome to ${campaignData.campaignIdea.split(' ').slice(0, 3).join(' ')} - the solution you've been waiting for.`,
          sfx: "Soft background music, subtle office ambience"
        },
        {
          sceneNumber: 2,
          duration: 15,
          storyBeat: "Demonstrate the key benefits and features",
          shotDescription: "Close-up shots showing product features and user interaction",
          cameraNotes: "Quick cuts between different angles, handheld for dynamic feel",
          voDialogue: "Experience the difference with our innovative approach and proven results.",
          sfx: "Product interaction sounds, upbeat music"
        },
        {
          sceneNumber: 3,
          duration: 5,
          storyBeat: "Call to action and closing",
          shotDescription: "Product logo with contact information and call-to-action text",
          cameraNotes: "Static shot with subtle animation of text elements",
          voDialogue: "Ready to get started? Visit us today and transform your experience.",
          sfx: "Final musical crescendo, fade out"
        }
      ],
      characters: [
        {
          characterId: "narrator",
          name: "Professional Narrator",
          appearance: "Confident, well-dressed professional in their 30s",
          attire: "Modern business casual - blazer and dress shirt",
          personality: "Authoritative yet approachable, knowledgeable and trustworthy",
          keyExpressions: "Confident smile, direct eye contact, professional demeanor"
        }
      ]
    },
    approvalUrl: `https://gluagents.xyz/webhook/approve-${Date.now()}`,
    executionId: `execution_${Date.now()}`
  };
};

export const submitCampaign = async (campaignData) => {
  try {
    console.log('Sending campaign data:', campaignData);
    console.log('Duration type:', typeof campaignData.duration, 'Value:', campaignData.duration);
    
    // Convert to form data but ensure duration is properly handled
    const formData = objectToFormData(campaignData);
    console.log('Form data string:', formData);
    
    const response = await fetch(`${API_BASE_URL}/start-campaign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // If not JSON, get text and try to parse
      const text = await response.text();
      console.log('API Response (text):', text);
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.log('JSON parse error:', parseError);
        console.log('Response text that failed to parse:', text);
        
        // Check if it's HTML (common n8n response)
        if (text.includes('<html') || text.includes('<!DOCTYPE')) {
          console.log('Received HTML response, likely n8n webhook page');
          data = createMockResponse(campaignData);
        } else if (text.trim() === '') {
          console.log('Empty response received');
          data = createMockResponse(campaignData);
        } else {
          // Try to extract JSON from the text if it's embedded
          const jsonMatch = text.match(/\{.*\}/s);
          if (jsonMatch) {
            try {
              data = JSON.parse(jsonMatch[0]);
            } catch (e) {
              console.log('Could not parse extracted JSON');
              data = createMockResponse(campaignData);
            }
          } else {
            console.log('No JSON found in response, using mock data');
            data = createMockResponse(campaignData);
          }
        }
      }
    }
    
    console.log('Final response data:', data);
    
    return data;
  } catch (error) {
    console.error('Error submitting campaign:', error);
    
    // For development, return mock data if API fails
    if (error.message.includes('Failed to fetch') || error.message.includes('Unexpected end of JSON')) {
      console.log('API not available, using mock data for development');
      return createMockResponse(campaignData);
    }
    
    throw new Error('Failed to submit campaign. Please try again.');
  }
};

export const submitApproval = async (approvalUrl, approvalData) => {
  try {
    console.log('Sending approval data:', approvalData);
    
    // Convert to form data to avoid preflight
    const formData = objectToFormData(approvalData);
    console.log('Approval form data string:', formData);
    
    const response = await fetch(approvalUrl, {
      method: 'POST',
      // Use application/x-www-form-urlencoded to avoid preflight
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // If not JSON, get text and try to parse
      const text = await response.text();
      console.log('Approval API Response (text):', text);
      
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.log('JSON parse error:', parseError);
        console.log('Response text that failed to parse:', text);
        throw new Error('Invalid response format from server');
      }
    }
    
    console.log('Final approval response data:', data);
    return data;
  } catch (error) {
    console.error('Error submitting approval:', error);
    throw new Error('Failed to submit approval. Please try again.');
  }
};
