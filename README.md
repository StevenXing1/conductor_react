# Conductor React

A modern React implementation of the Conductor learning management platform for UCSD Software Engineering courses.

## Tech Stack

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite 6.0
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Styling**: CSS Modules
- **Code Quality**: ESLint

## Project Structure

```
conductor_react/
├── src/
│   ├── pages/              # Page components
│   │   ├── LandingPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── InstructorDashboard.jsx
│   │   ├── TutorDashboard.jsx
│   │   ├── TADashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── AccessDenied.jsx
│   ├── services/           # API service layer
│   │   ├── api.js
│   │   └── dashboardService.js
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── .github/
│   └── copilot-instructions.md
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL (for backend database)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

### Backend Setup

This React frontend is designed to work with the existing Express.js backend from the original conductor-app. Make sure the backend server is running on port 5000 (or update the proxy settings in `vite.config.js`).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features

### Implemented
- ✅ Landing page with authentication
- ✅ Route-based navigation
- ✅ Multiple role-based dashboards
- ✅ API service layer with Axios
- ✅ Proxy configuration for backend API calls
- ✅ ESLint configuration

### To Be Implemented
- [ ] Authentication state management
- [ ] Protected routes with role-based access control
- [ ] Dashboard components (attendance, journals, etc.)
- [ ] Team management features
- [ ] Announcement system
- [ ] User directory
- [ ] Lecture and meeting attendance
- [ ] Journal entries
- [ ] Course settings

## Backend Integration

The Vite development server is configured to proxy API requests to the Express backend:

- `/api/*` → `http://localhost:5000/api/*`
- `/auth/*` → `http://localhost:5000/auth/*`

This allows the React app to make API calls without CORS issues during development.

## Development Guidelines

1. **Component Structure**: Use functional components with hooks
2. **State Management**: Start with local state, consider Context API or state management library as complexity grows
3. **Styling**: Use CSS modules for component-specific styles
4. **API Calls**: Always use the service layer (don't make direct axios calls in components)
5. **Error Handling**: Implement proper error boundaries and user feedback

## Next Steps

1. Implement authentication context and protected routes
2. Convert existing HTML pages to React components
3. Create reusable UI components (buttons, cards, forms, etc.)
4. Implement state management solution
5. Add comprehensive error handling
6. Set up testing framework (Vitest, React Testing Library)

## Contributing

Follow the existing code style and conventions. Run `npm run lint` before committing changes.

## License

This project is part of CSE 210 coursework at UCSD.
