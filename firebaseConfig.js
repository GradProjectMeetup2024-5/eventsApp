// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import the Firebase Storage functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmzZxRjM6QMFYXJqvLDWu8cWLH-K3E1cU",
  authDomain: "spotlight-53c23.firebaseapp.com",
  projectId: "spotlight-53c23",
  storageBucket: "spotlight-53c23.appspot.com",
  messagingSenderId: "1033010333489",
  appId: "1:1033010333489:web:d4960b589b781ff0f75210",
  measurementId: "G-L81786G3D8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { app, storage }; // Export app and storage for use in other files
