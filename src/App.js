import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Header from './Components/Header';
import ProfilePage from './Pages/ProfilePage';
import Footer from './Components/Footer';
import ProductPage from './Pages/ProductPage';
import CartPage from './Pages/CartPage';
import OrderShippingPage from './Pages/OrderShippingPage';
import WishlistPage from './Pages/WishlistPage';
import ContactPage from './Pages/ContactPage';
import AboutPage from './Pages/AboutPage';
import ScrollToTop from './Components/ScrollToTop';

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
        <ScrollToTop />
        <Header user={user} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/user" element={<ProfilePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/order-shipping" element={<OrderShippingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wish-list" element={<WishlistPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;