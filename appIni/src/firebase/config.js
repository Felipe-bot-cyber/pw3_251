import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyA5U16ue8v7IJuVi6m9zUZI9PAGxWG3kzE",
    authDomain: "etec2025-58fa6.firebaseapp.com",
    projectId: "etec2025-58fa6",
    storageBucket: "etec2025-58fa6.firebasestorage.app",
    messagingSenderId: "42889120956",
    appId: "1:42889120956:web:b7d8b384e122578a0f54b9",
    measurementId: "G-J582V96BN8"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app);
