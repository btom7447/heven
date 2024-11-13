import React, { useState } from 'react';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { auth, googleProvider } from '../firebaseConfig';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirect

const AuthModal = ({ isOpen, closeModal, setUser }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Set up the navigate function

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setIsForgotPassword(false); // Reset forgot password mode when toggling
    setError('');
  };

  const handleEmailAuth = async () => {
    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Set persistence for "Remember Me" first
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

      let userCredential;
      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password); // Using modular API
        toast.success("Sign Up Successful!");
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password); // Using modular API
        toast.success("Login Successful!");
      }

      setUser(userCredential.user); // Set the user after successful login/signup
      closeModal(); // Close modal on success
      navigate('/user'); // Redirect to user page after login
    } catch (error) {
      setError('Authentication error: ' + error.message);
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider); // Using modular API
      toast.success("Google Sign In Successful!");
      setUser(userCredential.user); // Set the user after successful Google sign-in
      closeModal();
      navigate('/user'); // Redirect to user page after login
    } catch (error) {
      setError('Google sign-in error: ' + error.message);
      toast.error(error.message);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent!");
      setError('Check your email for the password reset link.');
    } catch (error) {
      setError('Error sending password reset email: ' + error.message);
      toast.error(error.message);
    }
  };

  return isOpen ? (
    <div className="auth-modal">
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <button className='close-btn' onClick={closeModal}>
          <XMarkIcon className="w-6 h-6 text-black" />
        </button>
        <h2>{isForgotPassword ? 'Forgot Password' : isSignup ? 'Sign Up' : 'Log In'}</h2>

        {!isForgotPassword ? (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {isSignup && (
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            )}
            <div className="cred-options">
              <label className='remember-me' htmlFor="remember-me">
                <input
                  name='remember-me'
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember Me
              </label>
              <p className="forgot-password-link" onClick={() => setIsForgotPassword(true)} >
                Forgot Password?
              </p>
            </div>
            <button className='email-auth' onClick={handleEmailAuth}>
              {isSignup ? 'Sign Up' : 'Log In'}
            </button>

            <button className='google-auth' onClick={handleGoogleSignIn}>
              <FaGoogle className="google-icon" />
              <span>Sign in with Google</span>
            </button>

            <p onClick={toggleMode}>
              {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
            </p>
          </>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button className='reset-password' onClick={handlePasswordReset}>
              Reset Password
            </button>
            <p className="back-to-login" onClick={() => setIsForgotPassword(false)} >
              Back to Login
            </p>
          </>
        )}

      </motion.div>
    </div>
  ) : null;
};

export default AuthModal;