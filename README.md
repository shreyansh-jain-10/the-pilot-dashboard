# The Pilot Dashboard

A React.js web application for an AI video production pipeline. This dashboard provides a step-by-step agent-based system where users create video campaigns through multiple AI agents with human approval at each step.

## Current Scope: Agent 1 (Script Generator)

This version focuses on the first agent in the pipeline - the Script Generator. Users can create video campaigns, generate AI-powered scripts, and review/approve them with refinement capabilities.

## Features

- **Campaign Creation**: Professional form for inputting campaign details
- **AI Script Generation**: Integration with AI agents for script creation
- **Script Review**: Detailed view of generated scenes and characters
- **Approval Workflow**: Approve or request changes with feedback
- **Refinement Loop**: Iterative improvement based on feedback
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Professional UI**: Clean, modern design with Tailwind CSS

## Tech Stack

- **Framework**: React.js 18 with functional components and hooks
- **Styling**: Tailwind CSS for modern, professional design
- **State Management**: React useState/useContext (no external libraries)
- **HTTP Client**: Fetch API
- **UI Components**: Custom components (no external UI libraries)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd the-pilot-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── CampaignForm.jsx      # Campaign input form
│   ├── LoadingScreen.jsx     # Loading state component
│   ├── ScriptReview.jsx      # Script review interface
│   ├── SceneCard.jsx         # Individual scene display
│   ├── CharacterCard.jsx     # Character information display
│   └── ApprovalButtons.jsx   # Approve/reject functionality
├── utils/
│   └── api.js               # API utility functions
├── App.jsx                  # Main application component
├── App.css                  # Global styles
└── index.js                 # Application entry point
```

## API Integration

### Campaign Submission
- **Endpoint**: `https://gluagents.xyz/webhook/start-campaign`
- **Method**: POST
- **Purpose**: Submit campaign details and generate initial script

### Script Approval
- **Endpoint**: Dynamic (from approvalUrl in response)
- **Method**: POST
- **Purpose**: Approve script or request changes with feedback

## Usage

### 1. Create Campaign
- Fill out the campaign form with your video concept
- Specify tone, duration, and any special requirements
- Submit to generate the initial script

### 2. Review Script
- Review generated scenes with detailed descriptions
- Check character profiles and dialogue
- Examine camera notes and sound effects

### 3. Approve or Request Changes
- **Approve**: Accept the script and move to next pipeline stage
- **Request Changes**: Provide feedback for script refinement
- **Refinement Loop**: Continue iterating until satisfied

## Design Features

- **Professional Color Palette**: Blues, grays, and whites with accent colors
- **Responsive Layout**: Optimized for all screen sizes
- **Clean Typography**: Inter font family with proper hierarchy
- **Subtle Animations**: Loading states and smooth transitions
- **Intuitive UX**: Clear workflow progression and next steps

## Error Handling

- Network error handling with retry mechanisms
- Form validation with inline feedback
- User-friendly error messages
- Graceful fallbacks for API failures

## Future Enhancements

This dashboard is designed to be easily extensible for additional agents:
- Agent 2: Storyboard Generator
- Agent 3: Video Production
- Agent 4: Post-Production
- Agent 5: Final Review

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

### Code Style

- Functional components with hooks
- Custom components (no external UI libraries)
- Tailwind CSS for styling
- Clean, readable code structure
- Comprehensive error handling

## Contributing

1. Follow the existing code style and patterns
2. Ensure all components are responsive
3. Add proper error handling
4. Test on multiple screen sizes
5. Maintain the professional design aesthetic

## License

This project is part of The Pilot AI Video Production Pipeline.
