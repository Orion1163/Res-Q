// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    // Add Your Configuration here for firebase connection of firestore
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get auth instance

export { app, auth }; // Export auth instance along with app