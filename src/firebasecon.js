import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
// Add your configuration of authentication of firebase
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const database = getFirestore(app)