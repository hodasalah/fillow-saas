# Dashora SaaS Admin Dashboard

A modern, feature-rich admin dashboard built with React, TypeScript, and Firebase. This application provides a comprehensive suite of tools for managing users, communications, and analytics.

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

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn
-   Firebase account

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd dashora-saas
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

### Firebase Setup

1. Create a new Firebase project
2. Enable Authentication and choose your preferred sign-in methods
3. Create a Firestore database
4. Set up Firebase storage for file uploads
5. Add the following Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /conversations/{chatId} {
      allow read: if request.auth != null && request.auth.uid in resource.data.participants;
      allow create: if request.auth != null;
      allow update: if request.auth != null && request.auth.uid in resource.data.participants;
    }
    match /conversations/{chatId}/messages/{messageId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

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

Project Link: [https://github.com/hodasalah/](https://github.com/hodasalah/)
