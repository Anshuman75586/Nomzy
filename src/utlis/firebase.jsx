// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0Cq5zTzlK2JUxtvBOSiynaHxYoFJydFs",
  authDomain: "nomzy-a80ad.firebaseapp.com",
  projectId: "nomzy-a80ad",
  storageBucket: "nomzy-a80ad.firebasestorage.app",
  messagingSenderId: "963170252533",
  appId: "1:963170252533:web:346866bea2288b726577bc",
  measurementId: "G-NC2Z671W8D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
