import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';

// Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyDU91v2QSbRGgMUKl2VYZP6NkEo8vZNOnw",
    authDomain: "heven-7f300.firebaseapp.com",
    projectId: "heven-7f300",
    storageBucket: "heven-7f300.firebasestorage.app",
    messagingSenderId: "152266065541",
    appId: "1:152266065541:web:f412f57749b3a28d160bec",
    measurementId: "G-0H6R94VHYV"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup };