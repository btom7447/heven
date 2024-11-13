import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Header from './Components/Header';
import ProfilePage from './Pages/ProfilePage';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // User state will reflect the persisted session
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user" element={<ProfilePage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;