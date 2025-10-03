# AI Companion Frontend

A React-based frontend for the AI Companion application with authentication and user management.

## Features

- 🔐 User authentication (login/register)
- 👤 User dashboard with profile information
- 🎨 Modern UI with Tailwind CSS
- 🚀 Responsive design
- 🔒 Protected routes
- 📱 Mobile-friendly interface

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on port 3000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/          # React components
│   ├── Login.js        # Login form
│   ├── Register.js     # Registration form
│   ├── Dashboard.js    # User dashboard
│   └── Navbar.js       # Navigation bar
├── contexts/           # React contexts
│   └── AuthContext.js  # Authentication context
├── App.js             # Main app component
└── index.js           # App entry point
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Backend Integration

The frontend connects to the backend API at `http://localhost:3000/api` and includes:

- User registration and login
- JWT token authentication
- Protected routes
- User profile management

## Technologies Used

- React 18
- React Router DOM
- Tailwind CSS
- Axios for API calls
- Context API for state management
