# Dashora SaaS Admin Dashboard

A modern, feature-rich admin dashboard built with React, TypeScript, and Firebase. This application provides a comprehensive suite of tools for managing users, communications, and analytics.

## Live Demo

🚀 **Access the live application here:** [https://dashora-free.web.app](https://dashora-free.web.app)

> **Important:** To access the dashboard, you must **Login with Google** or create an account. The dashboard is protected and requires authentication.

### Available Routes

**Public Pages:**
- [`/login`](https://dashora-free.web.app/login) - User Login
- [`/signup`](https://dashora-free.web.app/signup) - Create Account

**Dashboard (Requires Login):**
- [`/dashboard`](https://dashora-free.web.app/dashboard) - Main Overview
- [`/dashboard/projects`](https://dashora-free.web.app/dashboard/projects) - Project Management
- [`/dashboard/chat`](https://dashora-free.web.app/dashboard/chat) - Real-time Chat
- [`/dashboard/profile`](https://dashora-free.web.app/dashboard/profile) - User Profile

## Features

### Authentication

-   Secure user authentication with Firebase Auth
-   Protected routes and role-based access control
-   Persistent login state management

### Dashboard

-   Modern and responsive UI design
-   Dark/Light theme support
-   Collapsible sidebar navigation
-   Real-time data updates
-   Interactive charts and analytics

### Chat System

-   Real-time messaging functionality
-   One-on-one chat capabilities
-   Message search functionality
-   User presence indicators
-   New chat creation with user selection
-   Message history and chat management
-   Real-time message notifications

### Profile Management

-   User profile customization
-   Profile picture upload
-   Account settings management
-   Activity tracking

### Projects

-   Project creation and management
-   Task tracking and progress monitoring
-   Project analytics and reporting

## Technology Stack

-   **Frontend Framework**: React 18 with TypeScript
-   **Build Tool**: Vite
-   **State Management**: Redux Toolkit
-   **Backend/Database**: Firebase
-   **Styling**: TailwindCSS
-   **Authentication**: Firebase Authentication
-   **Real-time Updates**: Firebase Realtime Database/Firestore
-   **Routing**: React Router v6



## Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run lint` - Run ESLint
-   `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── components/        # Reusable UI components
├── hooks/            # Custom React hooks
├── layout/           # Layout components
├── services/         # API and service integrations
├── store/           # Redux store configuration
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── App.tsx          # Root component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

-   Design inspiration from modern admin dashboards
-   Firebase team for excellent documentation
-   React and TypeScript communities

## Contact

Hoda Salah - hodasalah35@gmail.com

Live App: [https://dashora-free.web.app](https://dashora-free.web.app)

Project Link: [https://github.com/hodasalah/dashora-saas](https://github.com/hodasalah/dashora-saas)
