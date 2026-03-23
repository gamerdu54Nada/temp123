Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.).# Xodeon Cloud Dashboard Copy

A simple React app that allows users to register/login, generate API keys, and save/view data on the cloud using Firebase Firestore and Authentication.

## Features

- User registration and login with Firebase Auth
- Generate unique API keys
- Save key-value data pairs
- View and delete saved data
- Data stored in Firebase Firestore (cloud)
- Responsive UI with modern design

## Setup

1. Clone or download this repository.

2. Install dependencies:
   ```
   npm install
   ```

3. Set up Firebase:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database
   - Enable Authentication (Email/Password)
   - Get your Firebase config from Project Settings > General > Your apps > Web app
   - Update `src/firebase.js` with your config:
     ```js
     const firebaseConfig = {
       apiKey: "your-api-key",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "123456789",
       appId: "your-app-id"
     };
     ```

4. Run the app:
   ```
   npm run dev
   ```

5. Open http://localhost:5173 in your browser.

## How to Use

- Register a new account or login with existing credentials
- Once logged in, you'll be redirected to the dashboard
- Click "Generate New API Key" to get a unique API key
- Enter a key and value in the "Save Data" section and click "Save"
- View your saved data in the "Your Data" section
- Click "Delete" next to any item to remove it
- Click "Logout" to sign out

Note: This is a copy of the original site at https://xodeon-cloud-backend--gamerdu54n2.replit.app/
